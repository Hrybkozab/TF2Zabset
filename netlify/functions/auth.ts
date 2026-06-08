import { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const steamId = event.queryStringParameters?.steamid;

  if (!steamId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'steamid parameter is required' }),
    };
  }

  const apiKey = process.env.STEAM_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'STEAM_API_KEY is not configured' }),
    };
  }

  try {
    // Fetch player summary from Steam API
    const profileUrl = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamId}`;
    const profileResponse = await fetch(profileUrl);
    const profileData = await profileResponse.json();

    if (!profileData.response?.players?.[0]) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Profile not found' }),
      };
    }

    const player = profileData.response.players[0];

    // Return user data that can be stored in localStorage
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        id: Date.now(), // Temporary ID
        steamId: player.steamid,
        username: player.personaname,
        avatar: player.avatarfull,
        profileUrl: player.profileurl,
        country: player.loccountrycode || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    };
  } catch (error) {
    console.error('Auth error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to authenticate with Steam' }),
    };
  }
};
