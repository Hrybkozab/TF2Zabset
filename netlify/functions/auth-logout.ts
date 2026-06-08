import { Handler } from '@netlify/functions';
import { clearSessionCookie } from './_lib/session';
import { isSecureSite } from './_lib/site';

const headers = { 'Content-Type': 'application/json' };

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  return {
    statusCode: 200,
    headers: {
      ...headers,
      'Set-Cookie': clearSessionCookie(isSecureSite(event)),
    },
    body: JSON.stringify({ success: true }),
  };
};
