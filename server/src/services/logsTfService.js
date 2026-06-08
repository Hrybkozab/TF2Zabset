import axios from 'axios';

class LogsTfService {
  constructor() {
    this.apiKey = process.env.LOGSTF_API_KEY;
    this.baseUrl = process.env.LOGSTF_API_URL || 'https://logs.tf/api';
  }

  async searchLogs(steamId, limit = 50) {
    try {
      const response = await axios.get(`${this.baseUrl}/v1/log`, {
        params: {
          player: steamId,
          limit,
          key: this.apiKey,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching logs.tf:', error);
      throw error;
    }
  }

  async getLogDetails(logId) {
    try {
      const response = await axios.get(`${this.baseUrl}/v1/log/${logId}`, {
        params: { key: this.apiKey },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching log details:', error);
      throw error;
    }
  }

  async getPlayerStats(steamId) {
    try {
      const logs = await this.searchLogs(steamId, 100);
      if (!logs.logs || logs.logs.length === 0) {
        return {
          total_matches: 0,
          classes: {},
          kd_ratio: 0,
          avg_damage: 0,
          avg_heals: 0,
        };
      }

      let totalKills = 0;
      let totalDeaths = 0;
      let totalDamage = 0;
      let totalHeals = 0;
      const classStats = {};

      for (const log of logs.logs) {
        const details = await this.getLogDetails(log.id);
        if (details && details.players) {
          const playerStats = details.players[steamId];
          if (playerStats) {
            totalKills += playerStats.kills || 0;
            totalDeaths += playerStats.deaths || 0;
            totalDamage += playerStats.dmg || 0;
            totalHeals += playerStats.heals || 0;

            const playerClass = playerStats.class || 'unknown';
            if (!classStats[playerClass]) {
              classStats[playerClass] = {
                matches: 0,
                kills: 0,
                deaths: 0,
                damage: 0,
              };
            }
            classStats[playerClass].matches += 1;
            classStats[playerClass].kills += playerStats.kills || 0;
            classStats[playerClass].deaths += playerStats.deaths || 0;
            classStats[playerClass].damage += playerStats.dmg || 0;
          }
        }
      }

      return {
        total_matches: logs.logs.length,
        classes: classStats,
        kd_ratio: totalDeaths > 0 ? (totalKills / totalDeaths).toFixed(2) : 0,
        avg_damage: logs.logs.length > 0 ? Math.round(totalDamage / logs.logs.length) : 0,
        avg_heals: logs.logs.length > 0 ? Math.round(totalHeals / logs.logs.length) : 0,
      };
    } catch (error) {
      console.error('Error calculating player stats:', error);
      throw error;
    }
  }

  async importLog(logId, userId) {
    try {
      const details = await this.getLogDetails(logId);
      return {
        log_id: logId,
        log_url: `https://logs.tf/${logId}`,
        map: details.map,
        game_type: details.info?.game_type || 'pug',
        duration: details.info?.duration || 0,
        played_at: new Date(details.info?.date || Date.now()),
        stats_json: details,
      };
    } catch (error) {
      console.error('Error importing log:', error);
      throw error;
    }
  }
}

export default new LogsTfService();
