import { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const steamid = event.queryStringParameters?.steamid;
  const key = process.env.STEAM_API_KEY;

  if (!steamid || !key) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'missing steamid or STEAM_API_KEY' }),
    };
  }

  try {
    const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${key}&steamids=${steamid}`;
    const res = await fetch(url);
    const data = await res.json();

    const player = data?.response?.players?.[0];

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(player),
    };
  } catch (error) {
    console.error('Steam API error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to fetch Steam data' }),
    };
  }
};
