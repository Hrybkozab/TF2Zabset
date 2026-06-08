import { createHmac, timingSafeEqual } from 'crypto';

export interface SessionPayload {
  id: number;
  steamId: string;
  username: string;
  avatar: string | null;
  profileUrl: string | null;
  country: string | null;
  createdAt: string;
  updatedAt: string;
}

const COOKIE_NAME = 'zabset_session';
const MAX_AGE_SEC = 60 * 60 * 24 * 7; // 7 days

function secret(): string {
  const value = process.env.SESSION_SECRET || process.env.STEAM_API_KEY;
  if (!value) {
    throw new Error('SESSION_SECRET is not configured');
  }
  return value;
}

export function signSession(payload: SessionPayload): string {
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = createHmac('sha256', secret()).update(data).digest('base64url');
  return `${data}.${sig}`;
}

export function verifySession(token: string): SessionPayload | null {
  const [data, sig] = token.split('.');
  if (!data || !sig) return null;

  const expected = createHmac('sha256', secret()).update(data).digest('base64url');
  try {
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  } catch {
    return null;
  }

  try {
    return JSON.parse(Buffer.from(data, 'base64url').toString('utf8')) as SessionPayload;
  } catch {
    return null;
  }
}

export function sessionCookieHeader(token: string, secure: boolean): string {
  const flags = [
    `${COOKIE_NAME}=${token}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${MAX_AGE_SEC}`,
    secure ? 'Secure' : '',
  ].filter(Boolean);
  return flags.join('; ');
}

export function clearSessionCookie(secure: boolean): string {
  const flags = [
    `${COOKIE_NAME}=`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    'Max-Age=0',
    secure ? 'Secure' : '',
  ].filter(Boolean);
  return flags.join('; ');
}

export function readSessionCookie(cookieHeader?: string | null): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]+)`));
  return match?.[1] ? decodeURIComponent(match[1]) : null;
}

export { COOKIE_NAME, MAX_AGE_SEC };
