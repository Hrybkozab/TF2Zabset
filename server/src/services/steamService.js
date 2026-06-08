import axios from 'axios';

const STEAM_API_BASE = 'https://api.steampowered.com';

class SteamService {
  constructor() {
    this.apiKey = process.env.STEAM_API_KEY;
  }

  async getPlayerSummary(steamId) {
    try {
      const response = await axios.get(
        `${STEAM_API_BASE}/ISteamUser/GetPlayerSummaries/v2/`,
        {
          params: {
            key: this.apiKey,
            steamids: steamId,
          },
        }
      );
      return response.data.response.players[0];
    } catch (error) {
      console.error('Error fetching player summary:', error);
      throw error;
    }
  }

  async getPlayerStats(steamId) {
    try {
      const response = await axios.get(
        `${STEAM_API_BASE}/ISteamUserStats/GetUserStatsForGame/v0002/`,
        {
          params: {
            key: this.apiKey,
            steamid: steamId,
            appid: 440, // TF2 App ID
          },
        }
      );
      return response.data.playerstats;
    } catch (error) {
      console.error('Error fetching player stats:', error);
      throw error;
    }
  }

  async getOwnedGames(steamId) {
    try {
      const response = await axios.get(
        `${STEAM_API_BASE}/IPlayerService/GetOwnedGames/v0001/`,
        {
          params: {
            key: this.apiKey,
            steamid: steamId,
            format: 'json',
            include_appinfo: true,
            include_played_free_games: true,
          },
        }
      );
      return response.data.response.games;
    } catch (error) {
      console.error('Error fetching owned games:', error);
      throw error;
    }
  }

  async getTF2Playtime(steamId) {
    try {
      const games = await this.getOwnedGames(steamId);
      const tf2Game = games?.find((game) => game.appid === 440);
      return tf2Game ? tf2Game.playtime_forever / 60 : 0; // Convert to hours
    } catch (error) {
      console.error('Error fetching TF2 playtime:', error);
      return 0;
    }
  }

  async getAchievements(steamId) {
    try {
      const response = await axios.get(
        `${STEAM_API_BASE}/ISteamUserStats/GetPlayerAchievements/v0001/`,
        {
          params: {
            key: this.apiKey,
            steamid: steamId,
            appid: 440,
            l: 'english',
          },
        }
      );
      const achievements = response.data.playerstats.achievements || [];
      return {
        total: achievements.length,
        unlocked: achievements.filter((a) => a.achieved === 1).length,
        details: achievements,
      };
    } catch (error) {
      console.error('Error fetching achievements:', error);
      return { total: 0, unlocked: 0, details: [] };
    }
  }

  async getPlayerBackpack(steamId) {
    try {
      const response = await axios.get(
        `${STEAM_API_BASE}/IEconItems_440/GetPlayerItems/v0001/`,
        {
          params: {
            key: this.apiKey,
            steamid: steamId,
          },
        }
      );
      return response.data.result;
    } catch (error) {
      console.error('Error fetching player backpack:', error);
      throw error;
    }
  }
}

export default new SteamService();
