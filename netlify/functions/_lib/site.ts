import type { HandlerEvent } from '@netlify/functions';

export function siteOrigin(event: HandlerEvent): string {
  const host = event.headers['x-forwarded-host'] || event.headers.host || 'localhost:8888';
  const proto = event.headers['x-forwarded-proto'] || (host.includes('localhost') ? 'http' : 'https');
  return `${proto}://${host}`;
}

export function isSecureSite(event: HandlerEvent): boolean {
  const proto = event.headers['x-forwarded-proto'];
  return proto === 'https' || process.env.CONTEXT === 'production';
}
