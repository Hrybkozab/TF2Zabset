import { Handler } from '@netlify/functions';
import { upsertSteamUser, sessionWithoutDb } from './_lib/db';
import { signSession, sessionCookieHeader } from './_lib/session';
import { verifySteamOpenId } from './_lib/steam-openid';
import { isSecureSite, siteOrigin } from './_lib/site';

export const handler: Handler = async (event) => {
  const origin = siteOrigin(event);
  const redirectError = (message: string) => ({
    statusCode: 302,
    headers: { Location: `${origin}/profile?auth_error=${encodeURIComponent(message)}` },
    body: '',
  });

  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const params = event.queryStringParameters ?? {};
  const apiKey = process.env.STEAM_API_KEY;

  if (params['openid.mode'] === 'error') {
    const steamError = (params['openid.error'] ?? 'Steam login failed').replace(/\+/g, ' ');
    return redirectError(steamError);
  }

  if (!apiKey) {
    return redirectError('STEAM_API_KEY is not configured');
  }

  try {
    const steamId = await verifySteamOpenId(params as Record<string, string | undefined>);
    if (!steamId) {
      return redirectError('Steam login could not be verified');
    }

    const profileUrl = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamId}`;
    const profileResponse = await fetch(profileUrl);
    const profileData = await profileResponse.json();
    const player = profileData.response?.players?.[0];

    if (!player) {
      return redirectError('Steam profile not found');
    }

    const profileInput = {
      steamId: player.steamid,
      username: player.personaname,
      avatar: player.avatarfull || null,
      profileUrl: player.profileurl || null,
      country: player.loccountrycode || null,
    };

    const sessionUser =
      (await upsertSteamUser({
        steamId: profileInput.steamId,
        username: profileInput.username,
        avatar: profileInput.avatar,
        profileUrl: profileInput.profileUrl,
      })) ?? sessionWithoutDb(profileInput);

    const token = signSession(sessionUser);

    return {
      statusCode: 302,
      headers: {
        Location: `${origin}/profile`,
        'Set-Cookie': sessionCookieHeader(token, isSecureSite(event)),
      },
      body: '',
    };
  } catch (error) {
    console.error('Auth callback error:', error);
    return redirectError('Failed to complete Steam login');
  }
};
