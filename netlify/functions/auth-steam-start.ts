import { Handler } from '@netlify/functions';
import { siteOrigin } from './_lib/site';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const origin = siteOrigin(event);
  const returnUrl = `${origin}/.netlify/functions/auth-callback`;

  const params = new URLSearchParams({
    'openid.ns': 'http://specs.openid.net/auth/2.0',
    'openid.mode': 'checkid_setup',
    'openid.return_to': returnUrl,
    'openid.realm': origin,
    'openid.identity': 'http://specs.openid.net/auth/2.0/identifier_select',
  });

  return {
    statusCode: 302,
    headers: {
      Location: `https://steamcommunity.com/openid/login?${params.toString()}`,
    },
    body: '',
  };
};
