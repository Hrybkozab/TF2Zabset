import { neon } from '@neondatabase/serverless';

export interface GuideRow {
  id: number;
  user_id: number;
  title: string;
  content: string;
  tf2_class: string | null;
  tags: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
  username?: string;
  avatar?: string | null;
  avg_rating?: number | string;
  rating_count?: number | string;
  user_rating?: number | null;
}

function db() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  return neon(url);
}

export function dbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

function mapGuide(row: GuideRow) {
  return {
    id: row.id,
    user_id: row.user_id,
    title: row.title,
    content: row.content,
    tf2_class: row.tf2_class,
    tags: row.tags ?? [],
    published: row.published,
    created_at: row.created_at,
    updated_at: row.updated_at,
    username: row.username ?? 'Unknown',
    avatar: row.avatar ?? null,
    avg_rating: Number(row.avg_rating ?? 0),
    rating_count: Number(row.rating_count ?? 0),
    user_rating: row.user_rating != null ? Number(row.user_rating) : null,
  };
}

export async function listPublishedGuides(params: {
  tf2Class?: string;
  search?: string;
  limit: number;
  offset: number;
}) {
  const sql = db();
  if (!sql) return [];

  const limit = Math.min(Math.max(params.limit, 1), 100);
  const offset = Math.max(params.offset, 0);
  const search = params.search?.trim();
  const searchPattern = search ? `%${search}%` : null;

  let rows: GuideRow[];

  if (params.tf2Class && searchPattern) {
    rows = await sql`
      SELECT g.*, u.username, u.avatar,
             COALESCE(AVG(gr.rating), 0) AS avg_rating,
             COUNT(gr.id)::int AS rating_count
      FROM guides g
      LEFT JOIN users u ON g.user_id = u.id
      LEFT JOIN guide_ratings gr ON g.id = gr.guide_id
      WHERE g.published = true
        AND g.tf2_class = ${params.tf2Class}
        AND (g.title ILIKE ${searchPattern} OR g.content ILIKE ${searchPattern})
      GROUP BY g.id, u.username, u.avatar
      ORDER BY g.created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;
  } else if (params.tf2Class) {
    rows = await sql`
      SELECT g.*, u.username, u.avatar,
             COALESCE(AVG(gr.rating), 0) AS avg_rating,
             COUNT(gr.id)::int AS rating_count
      FROM guides g
      LEFT JOIN users u ON g.user_id = u.id
      LEFT JOIN guide_ratings gr ON g.id = gr.guide_id
      WHERE g.published = true AND g.tf2_class = ${params.tf2Class}
      GROUP BY g.id, u.username, u.avatar
      ORDER BY g.created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;
  } else if (searchPattern) {
    rows = await sql`
      SELECT g.*, u.username, u.avatar,
             COALESCE(AVG(gr.rating), 0) AS avg_rating,
             COUNT(gr.id)::int AS rating_count
      FROM guides g
      LEFT JOIN users u ON g.user_id = u.id
      LEFT JOIN guide_ratings gr ON g.id = gr.guide_id
      WHERE g.published = true
        AND (g.title ILIKE ${searchPattern} OR g.content ILIKE ${searchPattern})
      GROUP BY g.id, u.username, u.avatar
      ORDER BY g.created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;
  } else {
    rows = await sql`
      SELECT g.*, u.username, u.avatar,
             COALESCE(AVG(gr.rating), 0) AS avg_rating,
             COUNT(gr.id)::int AS rating_count
      FROM guides g
      LEFT JOIN users u ON g.user_id = u.id
      LEFT JOIN guide_ratings gr ON g.id = gr.guide_id
      WHERE g.published = true
      GROUP BY g.id, u.username, u.avatar
      ORDER BY g.created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;
  }

  return rows.map((row) => mapGuide(row as GuideRow));
}

export async function getGuideById(id: number, viewerUserId?: number) {
  const sql = db();
  if (!sql) return null;

  const rows = await sql`
    SELECT g.*, u.username, u.avatar,
           COALESCE(AVG(gr.rating), 0) AS avg_rating,
           COUNT(gr.id)::int AS rating_count,
           MAX(CASE WHEN gr.user_id = ${viewerUserId ?? null} THEN gr.rating END) AS user_rating
    FROM guides g
    LEFT JOIN users u ON g.user_id = u.id
    LEFT JOIN guide_ratings gr ON g.id = gr.guide_id
    WHERE g.id = ${id}
    GROUP BY g.id, u.username, u.avatar
  `;

  if (!rows.length) return null;
  const guide = mapGuide(rows[0] as GuideRow);

  if (!guide.published && guide.user_id !== viewerUserId) {
    return null;
  }

  return guide;
}

export async function createGuide(input: {
  userId: number;
  title: string;
  content: string;
  tf2Class?: string | null;
  tags: string[];
  published: boolean;
}) {
  const sql = db();
  if (!sql) return null;

  const rows = await sql`
    INSERT INTO guides (user_id, title, content, tf2_class, tags, published)
    VALUES (
      ${input.userId},
      ${input.title},
      ${input.content},
      ${input.tf2Class ?? null},
      ${input.tags},
      ${input.published}
    )
    RETURNING *
  `;

  if (!rows.length) return null;
  const created = rows[0] as GuideRow;
  return mapGuide({
    ...created,
    username: undefined,
    avatar: null,
    avg_rating: 0,
    rating_count: 0,
  });
}

export async function updateGuide(
  id: number,
  userId: number,
  input: {
    title?: string;
    content?: string;
    tf2Class?: string | null;
    tags?: string[];
    published?: boolean;
  }
) {
  const sql = db();
  if (!sql) return null;

  const existing = await sql`SELECT * FROM guides WHERE id = ${id} LIMIT 1`;
  if (!existing.length) return { error: 'not_found' as const };
  const row = existing[0] as GuideRow;
  if (row.user_id !== userId) return { error: 'forbidden' as const };

  const rows = await sql`
    UPDATE guides
    SET title = ${input.title ?? row.title},
        content = ${input.content ?? row.content},
        tf2_class = ${input.tf2Class !== undefined ? input.tf2Class : row.tf2_class},
        tags = ${input.tags ?? row.tags},
        published = ${input.published ?? row.published},
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
    RETURNING *
  `;

  return { guide: mapGuide(rows[0] as GuideRow) };
}

export async function deleteGuide(id: number, userId: number) {
  const sql = db();
  if (!sql) return { error: 'no_db' as const };

  const existing = await sql`SELECT user_id FROM guides WHERE id = ${id} LIMIT 1`;
  if (!existing.length) return { error: 'not_found' as const };
  if ((existing[0] as { user_id: number }).user_id !== userId) return { error: 'forbidden' as const };

  await sql`DELETE FROM guides WHERE id = ${id}`;
  return { success: true as const };
}

export async function rateGuide(guideId: number, userId: number, rating: number) {
  const sql = db();
  if (!sql) return { error: 'no_db' as const };

  await sql`
    INSERT INTO guide_ratings (guide_id, user_id, rating)
    VALUES (${guideId}, ${userId}, ${rating})
    ON CONFLICT (guide_id, user_id)
    DO UPDATE SET rating = ${rating}
  `;

  return { success: true as const };
}

export async function listUserGuides(userId: number) {
  const sql = db();
  if (!sql) return [];

  const rows = await sql`
    SELECT g.*,
           COALESCE(AVG(gr.rating), 0) AS avg_rating,
           COUNT(gr.id)::int AS rating_count
    FROM guides g
    LEFT JOIN guide_ratings gr ON g.id = gr.guide_id
    WHERE g.user_id = ${userId}
    GROUP BY g.id
    ORDER BY g.created_at DESC
  `;

  return rows.map((row) =>
    mapGuide({
      ...(row as GuideRow),
      username: undefined,
      avatar: null,
    })
  );
}

export async function resolveDbUserId(steamId: string): Promise<number | null> {
  const sql = db();
  if (!sql) return null;
  const rows = await sql`SELECT id FROM users WHERE steam_id = ${steamId} LIMIT 1`;
  return rows.length ? Number((rows[0] as { id: number }).id) : null;
}
