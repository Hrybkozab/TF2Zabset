import { Handler } from '@netlify/functions';
import { readSessionCookie, verifySession } from './_lib/session';

const headers = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store',
};

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const token = readSessionCookie(event.headers.cookie);
  if (!token) {
    return { statusCode: 401, headers, body: JSON.stringify({ error: 'Not authenticated' }) };
  }

  const user = verifySession(token);
  if (!user) {
    return { statusCode: 401, headers, body: JSON.stringify({ error: 'Invalid session' }) };
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ user }),
  };
};
