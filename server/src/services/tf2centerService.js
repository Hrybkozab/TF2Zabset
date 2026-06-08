import axios from 'axios';

class TF2CenterService {
  constructor() {
    this.apiKey = process.env.TF2CENTER_API_KEY;
    this.baseUrl = process.env.TF2CENTER_API_URL || 'https://api.tf2center.com';
  }

  async getUserProfile(steamId) {
    try {
      const response = await axios.get(`${this.baseUrl}/users/profile`, {
        params: { steam_id: steamId },
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching TF2Center profile:', error);
      throw error;
    }
  }

  async getUserMatches(steamId, limit = 50) {
    try {
      const response = await axios.get(`${this.baseUrl}/users/matches`, {
        params: { steam_id: steamId, limit },
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching TF2Center matches:', error);
      throw error;
    }
  }

  async getMatchDetails(matchId) {
    try {
      const response = await axios.get(`${this.baseUrl}/matches/${matchId}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching match details:', error);
      throw error;
    }
  }

  async getUserStats(steamId) {
    try {
      const response = await axios.get(`${this.baseUrl}/users/stats`, {
        params: { steam_id: steamId },
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user stats:', error);
      throw error;
    }
  }

  async connectAccount(steamId, tf2centerId) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/connect`,
        { steam_id: steamId, tf2center_id: tf2centerId },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error connecting TF2Center account:', error);
      throw error;
    }
  }
}

export default new TF2CenterService();
