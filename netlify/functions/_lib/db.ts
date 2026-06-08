import { neon } from '@neondatabase/serverless';
import type { SessionPayload } from './session';

interface DbUserRow {
  id: number;
  steam_id: string;
  username: string;
  avatar: string | null;
  profile_url: string | null;
  created_at: string;
  updated_at: string;
}

function sql() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  return neon(url);
}

export async function upsertSteamUser(input: {
  steamId: string;
  username: string;
  avatar: string | null;
  profileUrl: string | null;
}): Promise<SessionPayload | null> {
  const db = sql();
  if (!db) return null;

  const existing = await db`
    SELECT id, steam_id, username, avatar, profile_url, created_at, updated_at
    FROM users
    WHERE steam_id = ${input.steamId}
    LIMIT 1
  `;

  if (existing.length > 0) {
    const row = existing[0] as DbUserRow;
    const updated = await db`
      UPDATE users
      SET username = ${input.username},
          avatar = ${input.avatar},
          profile_url = ${input.profileUrl},
          updated_at = CURRENT_TIMESTAMP
      WHERE steam_id = ${input.steamId}
      RETURNING id, steam_id, username, avatar, profile_url, created_at, updated_at
    `;
    return rowToSession((updated[0] ?? row) as DbUserRow, input.steamId);
  }

  const inserted = await db`
    INSERT INTO users (steam_id, username, avatar, profile_url)
    VALUES (${input.steamId}, ${input.username}, ${input.avatar}, ${input.profileUrl})
    RETURNING id, steam_id, username, avatar, profile_url, created_at, updated_at
  `;

  if (!inserted.length) return null;
  return rowToSession(inserted[0] as DbUserRow, input.steamId);
}

function rowToSession(row: DbUserRow, steamId: string): SessionPayload {
  return {
    id: row.id,
    steamId: row.steam_id ?? steamId,
    username: row.username,
    avatar: row.avatar,
    profileUrl: row.profile_url,
    country: null,
    createdAt: new Date(row.created_at).toISOString(),
    updatedAt: new Date(row.updated_at).toISOString(),
  };
}

export function sessionWithoutDb(input: {
  steamId: string;
  username: string;
  avatar: string | null;
  profileUrl: string | null;
  country: string | null;
}): SessionPayload {
  const now = new Date().toISOString();
  const stableId = Number(BigInt(input.steamId) % BigInt(2_147_483_647)) || 1;

  return {
    id: stableId,
    steamId: input.steamId,
    username: input.username,
    avatar: input.avatar,
    profileUrl: input.profileUrl,
    country: input.country,
    createdAt: now,
    updatedAt: now,
  };
}
