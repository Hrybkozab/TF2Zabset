import type { HandlerEvent } from '@netlify/functions';
import { readSessionCookie, verifySession, type SessionPayload } from './session';

export function getSessionUser(event: HandlerEvent): SessionPayload | null {
  const token = readSessionCookie(event.headers.cookie ?? event.headers.Cookie);
  if (!token) return null;
  return verifySession(token);
}

export function requireSessionUser(event: HandlerEvent): SessionPayload | null {
  return getSessionUser(event);
}
