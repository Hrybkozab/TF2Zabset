import express from 'express';
import pool from '../database/connection.js';
import { isAuthenticated, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Get all guides
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { class: tf2Class, search, limit = 20, offset = 0 } = req.query;
    
    let query = `
      SELECT g.*, u.username, u.avatar, 
             COALESCE(AVG(gr.rating), 0) as avg_rating,
             COUNT(gr.id) as rating_count
      FROM guides g
      LEFT JOIN users u ON g.user_id = u.id
      LEFT JOIN guide_ratings gr ON g.id = gr.guide_id
      WHERE g.published = true
    `;
    const params = [];
    let paramCount = 1;
    
    if (tf2Class) {
      query += ` AND g.tf2_class = $${paramCount}`;
      params.push(tf2Class);
      paramCount++;
    }
    
    if (search) {
      query += ` AND (g.title ILIKE $${paramCount} OR g.content ILIKE $${paramCount})`;
      params.push(`%${search}%`);
      paramCount++;
    }
    
    query += ` GROUP BY g.id, u.username, u.avatar ORDER BY g.created_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    params.push(limit, offset);
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching guides:', error);
    res.status(500).json({ error: 'Failed to fetch guides' });
  }
});

// Get single guide
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    
    const result = await pool.query(
      `SELECT g.*, u.username, u.avatar,
              COALESCE(AVG(gr.rating), 0) as avg_rating,
              COUNT(gr.id) as rating_count,
              CASE WHEN gr.user_id = $2 THEN gr.rating ELSE NULL END as user_rating
       FROM guides g
       LEFT JOIN users u ON g.user_id = u.id
       LEFT JOIN guide_ratings gr ON g.id = gr.guide_id
       WHERE g.id = $1
       GROUP BY g.id, u.username, u.avatar, gr.user_id, gr.rating`,
      [id, userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Guide not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching guide:', error);
    res.status(500).json({ error: 'Failed to fetch guide' });
  }
});

// Create guide
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const { title, content, tf2Class, tags, published } = req.body;
    
    const result = await pool.query(
      `INSERT INTO guides (user_id, title, content, tf2_class, tags, published)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [req.user.id, title, content, tf2Class, tags, published]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating guide:', error);
    res.status(500).json({ error: 'Failed to create guide' });
  }
});

// Update guide
router.put('/:id', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, tf2Class, tags, published } = req.body;
    
    // Check ownership
    const guide = await pool.query('SELECT * FROM guides WHERE id = $1', [id]);
    if (guide.rows.length === 0) {
      return res.status(404).json({ error: 'Guide not found' });
    }
    
    if (guide.rows[0].user_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    
    const result = await pool.query(
      `UPDATE guides 
       SET title = $1, content = $2, tf2_class = $3, tags = $4, published = $5, updated_at = CURRENT_TIMESTAMP
       WHERE id = $6
       RETURNING *`,
      [title, content, tf2Class, tags, published, id]
    );
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating guide:', error);
    res.status(500).json({ error: 'Failed to update guide' });
  }
});

// Delete guide
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check ownership
    const guide = await pool.query('SELECT * FROM guides WHERE id = $1', [id]);
    if (guide.rows.length === 0) {
      return res.status(404).json({ error: 'Guide not found' });
    }
    
    if (guide.rows[0].user_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    
    await pool.query('DELETE FROM guides WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting guide:', error);
    res.status(500).json({ error: 'Failed to delete guide' });
  }
});

// Rate guide
router.post('/:id/rate', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;
    
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }
    
    await pool.query(
      `INSERT INTO guide_ratings (guide_id, user_id, rating)
       VALUES ($1, $2, $3)
       ON CONFLICT (guide_id, user_id) 
       DO UPDATE SET rating = $3`,
      [id, req.user.id, rating]
    );
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error rating guide:', error);
    res.status(500).json({ error: 'Failed to rate guide' });
  }
});

// Get user's guides
router.get('/user/my-guides', isAuthenticated, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT g.*, 
              COALESCE(AVG(gr.rating), 0) as avg_rating,
              COUNT(gr.id) as rating_count
       FROM guides g
       LEFT JOIN guide_ratings gr ON g.id = gr.guide_id
       WHERE g.user_id = $1
       GROUP BY g.id
       ORDER BY g.created_at DESC`,
      [req.user.id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching user guides:', error);
    res.status(500).json({ error: 'Failed to fetch user guides' });
  }
});

export default router;
