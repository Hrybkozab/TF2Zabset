// Steam API client for frontend

const API_BASE = '/.netlify/functions';

export interface SteamProfile {
  steamid: string;
  personaname: string;
  avatarfull: string;
  profileurl: string;
  loccountrycode?: string;
}

export async function getSteamProfile(steamid: string): Promise<SteamProfile> {
  const res = await fetch(`${API_BASE}/steam-profile?steamid=${steamid}`);
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to fetch Steam profile');
  }
  
  return res.json();
}

export function loginWithSteam(): void {
  window.location.href = `${window.location.origin}/.netlify/functions/auth-steam-start`;
}
