import type { HandlerEvent } from '@netlify/functions';

export function corsHeaders(event: HandlerEvent): Record<string, string> {
  const origin = event.headers.origin || event.headers.Origin;
  const allowed =
    origin ||
    process.env.URL ||
    process.env.DEPLOY_PRIME_URL ||
    'http://localhost:8888';

  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Cache-Control': 'no-store',
  };
}

export function jsonResponse(
  event: HandlerEvent,
  statusCode: number,
  body: unknown,
  extraHeaders?: Record<string, string>
) {
  return {
    statusCode,
    headers: { ...corsHeaders(event), ...extraHeaders },
    body: JSON.stringify(body),
  };
}

export function emptyResponse(
  event: HandlerEvent,
  statusCode: number,
  extraHeaders?: Record<string, string>
) {
  return {
    statusCode,
    headers: { ...corsHeaders(event), ...extraHeaders },
    body: '',
  };
}

export function handleOptions(event: HandlerEvent) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders(event), body: '' };
  }
  return null;
}
