import type { User } from '@/types';

const NETLIFY_AUTH = '/.netlify/functions';
const API_BASE = import.meta.env.VITE_API_BASE as string | undefined;

export function usesExpressAuth(): boolean {
  return Boolean(API_BASE?.trim());
}

function mapExpressUser(row: Record<string, unknown>): User {
  return {
    id: Number(row.id),
    steamId: String(row.steam_id ?? row.steamId),
    username: String(row.username),
    avatar: (row.avatar as string) ?? null,
    profileUrl: String(row.profile_url ?? row.profileUrl ?? ''),
    country: null,
    createdAt: String(row.created_at ?? row.createdAt ?? new Date().toISOString()),
    updatedAt: String(row.updated_at ?? row.updatedAt ?? new Date().toISOString()),
  };
}

function mapSessionUser(data: Record<string, unknown>): User {
  return {
    id: Number(data.id),
    steamId: String(data.steamId),
    username: String(data.username),
    avatar: (data.avatar as string) ?? null,
    profileUrl: String(data.profileUrl ?? ''),
    country: (data.country as string) ?? null,
    createdAt: String(data.createdAt),
    updatedAt: String(data.updatedAt),
  };
}

export async function fetchCurrentUser(): Promise<User | null> {
  if (usesExpressAuth()) {
    const response = await fetch(`${API_BASE}/auth/user`, { credentials: 'include' });
    if (!response.ok) return null;
    const row = await response.json();
    return mapExpressUser(row);
  }

  const response = await fetch(`${NETLIFY_AUTH}/auth-session`, { credentials: 'include' });
  if (!response.ok) return null;
  const payload = await response.json();
  return mapSessionUser(payload.user);
}

export async function logoutUser(): Promise<void> {
  if (usesExpressAuth()) {
    await fetch(`${API_BASE}/auth/logout`, { method: 'POST', credentials: 'include' });
    return;
  }

  await fetch(`${NETLIFY_AUTH}/auth-logout`, { method: 'POST', credentials: 'include' });
}

export function startSteamLogin(): void {
  if (usesExpressAuth()) {
    window.location.href = `${API_BASE}/auth/steam`;
    return;
  }

  // Server-side redirect avoids Akamai blocks on long client-built Steam URLs
  window.location.href = `${window.location.origin}/.netlify/functions/auth-steam-start`;
}

/** Legacy localStorage session (migrated once, then cleared). */
export function readLegacyStoredUser(): User | null {
  try {
    const stored = localStorage.getItem('user');
    if (!stored) return null;
    return JSON.parse(stored) as User;
  } catch {
    return null;
  }
}

export function clearLegacyStoredUser(): void {
  localStorage.removeItem('user');
}
