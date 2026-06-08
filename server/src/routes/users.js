import express from 'express';
import pool from '../database/connection.js';
import { isAuthenticated } from '../middleware/auth.js';
import steamService from '../services/steamService.js';
import tf2centerService from '../services/tf2centerService.js';
import logsTfService from '../services/logsTfService.js';

const router = express.Router();

// Get user profile
router.get('/profile', isAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user stats from Steam
router.get('/stats/steam', isAuthenticated, async (req, res) => {
  try {
    const steamId = req.user.steam_id;
    
    // Check cache
    const cacheResult = await pool.query(
      'SELECT * FROM steam_stats_cache WHERE user_id = $1',
      [req.user.id]
    );
    
    const cacheAge = cacheResult.rows.length > 0 
      ? Date.now() - new Date(cacheResult.rows[0].cached_at).getTime()
      : Infinity;
    
    // Return cached data if less than 1 hour old
    if (cacheResult.rows.length > 0 && cacheAge < 3600000) {
      return res.json(cacheResult.rows[0]);
    }
    
    // Fetch fresh data
    const [stats, playtime, achievements] = await Promise.all([
      steamService.getPlayerStats(steamId),
      steamService.getTF2Playtime(steamId),
      steamService.getAchievements(steamId),
    ]);
    
    const statsData = {
      stats_json: stats,
      playtime_hours: playtime,
      achievements_count: achievements.unlocked,
    };
    
    // Upsert cache
    await pool.query(
      `INSERT INTO steam_stats_cache (user_id, stats_json, playtime_hours, achievements_count)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (user_id) 
       DO UPDATE SET stats_json = $2, playtime_hours = $3, achievements_count = $4, cached_at = CURRENT_TIMESTAMP`,
      [req.user.id, stats, playtime, achievements.unlocked]
    );
    
    res.json(statsData);
  } catch (error) {
    console.error('Error fetching Steam stats:', error);
    res.status(500).json({ error: 'Failed to fetch Steam stats' });
  }
});

// Connect TF2Center account
router.post('/connect/tf2center', isAuthenticated, async (req, res) => {
  try {
    const { tf2centerId } = req.body;
    const steamId = req.user.steam_id;
    
    // Verify TF2Center account
    const tf2centerProfile = await tf2centerService.getUserProfile(steamId);
    
    // Save connection
    await pool.query(
      `INSERT INTO tf2center_connections (user_id, tf2center_id, tf2center_username)
       VALUES ($1, $2, $3)
       ON CONFLICT (tf2center_id) 
       DO UPDATE SET user_id = $1, tf2center_username = $3, updated_at = CURRENT_TIMESTAMP`,
      [req.user.id, tf2centerId, tf2centerProfile.username]
    );
    
    res.json({ success: true, profile: tf2centerProfile });
  } catch (error) {
    console.error('Error connecting TF2Center:', error);
    res.status(500).json({ error: 'Failed to connect TF2Center account' });
  }
});

// Get TF2Center matches
router.get('/matches/tf2center', isAuthenticated, async (req, res) => {
  try {
    const steamId = req.user.steam_id;
    const matches = await tf2centerService.getUserMatches(steamId);
    
    // Store matches in database
    for (const match of matches) {
      await pool.query(
        `INSERT INTO tf2center_matches (user_id, match_id, match_url, team, result, played_at, stats_json)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (match_id) DO NOTHING`,
        [
          req.user.id,
          match.id,
          match.url,
          match.team,
          match.result,
          new Date(match.played_at),
          match,
        ]
      );
    }
    
    res.json(matches);
  } catch (error) {
    console.error('Error fetching TF2Center matches:', error);
    res.status(500).json({ error: 'Failed to fetch TF2Center matches' });
  }
});

// Get logs.tf stats
router.get('/stats/logstf', isAuthenticated, async (req, res) => {
  try {
    const steamId = req.user.steam_id;
    const stats = await logsTfService.getPlayerStats(steamId);
    
    // Import recent logs
    const logs = await logsTfService.searchLogs(steamId, 20);
    for (const log of logs.logs) {
      const logData = await logsTfService.importLog(log.id, req.user.id);
      await pool.query(
        `INSERT INTO match_logs (user_id, log_id, log_url, map, game_type, duration, played_at, stats_json)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (log_id) DO NOTHING`,
        [
          req.user.id,
          logData.log_id,
          logData.log_url,
          logData.map,
          logData.game_type,
          logData.duration,
          logData.played_at,
          logData.stats_json,
        ]
      );
    }
    
    res.json(stats);
  } catch (error) {
    console.error('Error fetching logs.tf stats:', error);
    res.status(500).json({ error: 'Failed to fetch logs.tf stats' });
  }
});

// Get match history
router.get('/matches/history', isAuthenticated, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM match_logs 
       WHERE user_id = $1 
       ORDER BY played_at DESC 
       LIMIT 50`,
      [req.user.id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching match history:', error);
    res.status(500).json({ error: 'Failed to fetch match history' });
  }
});

export default router;
