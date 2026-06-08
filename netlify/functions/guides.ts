import { Handler } from '@netlify/functions';
import { requireSessionUser } from './_lib/auth-request';
import {
  createGuide,
  dbConfigured,
  deleteGuide,
  getGuideById,
  listPublishedGuides,
  listUserGuides,
  rateGuide,
  resolveDbUserId,
  updateGuide,
} from './_lib/guides-db';
import { emptyResponse, handleOptions, jsonResponse } from './_lib/http';

function parseSegments(path: string): string[] {
  const normalized = path
    .replace(/^https?:\/\/[^/]+/, '')
    .replace(/^\/?\.netlify\/functions\/guides\/?/, '')
    .replace(/^\/?api\/guides\/?/, '')
    .replace(/^\/?guides\/?/, '');

  return normalized.split('/').filter(Boolean);
}

async function resolveUserId(event: Parameters<Handler>[0]) {
  const session = requireSessionUser(event);
  if (!session || !dbConfigured()) return null;

  return resolveDbUserId(session.steamId);
}

export const handler: Handler = async (event) => {
  const options = handleOptions(event);
  if (options) return options;

  if (!dbConfigured()) {
    return jsonResponse(event, 503, {
      error: 'Database not configured. Set DATABASE_URL in Netlify environment variables.',
    });
  }

  const segments = parseSegments(event.path || '');
  const method = event.httpMethod;

  try {
    if (segments[0] === 'user' && segments[1] === 'my-guides' && method === 'GET') {
      const userId = await resolveUserId(event);
      if (!userId) {
        return jsonResponse(event, 401, { error: 'Authentication required' });
      }
      const guides = await listUserGuides(userId);
      return jsonResponse(event, 200, guides);
    }

    if (segments.length === 2 && segments[1] === 'rate' && method === 'POST') {
      const guideId = Number(segments[0]);
      const userId = await resolveUserId(event);
      if (!userId) {
        return jsonResponse(event, 401, { error: 'Authentication required' });
      }

      const body = JSON.parse(event.body || '{}');
      const rating = Number(body.rating);
      if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
        return jsonResponse(event, 400, { error: 'Rating must be between 1 and 5' });
      }

      await rateGuide(guideId, userId, rating);
      return jsonResponse(event, 200, { success: true });
    }

    if (segments.length === 1 && /^\d+$/.test(segments[0])) {
      const guideId = Number(segments[0]);
      const viewerId = (await resolveUserId(event)) ?? undefined;

      if (method === 'GET') {
        const guide = await getGuideById(guideId, viewerId);
        if (!guide) {
          return jsonResponse(event, 404, { error: 'Guide not found' });
        }
        return jsonResponse(event, 200, guide);
      }

      if (method === 'PUT') {
        const userId = await resolveUserId(event);
        if (!userId) {
          return jsonResponse(event, 401, { error: 'Authentication required' });
        }

        const body = JSON.parse(event.body || '{}');
        const result = await updateGuide(guideId, userId, {
          title: body.title,
          content: body.content,
          tf2Class: body.tf2Class ?? body.tf2_class,
          tags: body.tags,
          published: body.published,
        });

        if (result && 'error' in result) {
          if (result.error === 'not_found') {
            return jsonResponse(event, 404, { error: 'Guide not found' });
          }
          return jsonResponse(event, 403, { error: 'Not authorized' });
        }

        return jsonResponse(event, 200, result?.guide);
      }

      if (method === 'DELETE') {
        const userId = await resolveUserId(event);
        if (!userId) {
          return jsonResponse(event, 401, { error: 'Authentication required' });
        }

        const result = await deleteGuide(guideId, userId);
        if (result && 'error' in result) {
          if (result.error === 'not_found') {
            return jsonResponse(event, 404, { error: 'Guide not found' });
          }
          return jsonResponse(event, 403, { error: 'Not authorized' });
        }

        return emptyResponse(event, 204);
      }
    }

    if (segments.length === 0) {
      if (method === 'GET') {
        const query = event.queryStringParameters ?? {};
        const guides = await listPublishedGuides({
          tf2Class: query.class,
          search: query.search,
          limit: query.limit ? Number(query.limit) : 100,
          offset: query.offset ? Number(query.offset) : 0,
        });
        return jsonResponse(event, 200, guides);
      }

      if (method === 'POST') {
        const userId = await resolveUserId(event);
        if (!userId) {
          return jsonResponse(event, 401, { error: 'Authentication required' });
        }

        const body = JSON.parse(event.body || '{}');
        if (!body.title?.trim() || !body.content?.trim()) {
          return jsonResponse(event, 400, { error: 'Title and content are required' });
        }

        const guide = await createGuide({
          userId,
          title: body.title.trim(),
          content: body.content.trim(),
          tf2Class: body.tf2Class ?? body.tf2_class ?? null,
          tags: Array.isArray(body.tags) ? body.tags : [],
          published: Boolean(body.published),
        });

        if (!guide) {
          return jsonResponse(event, 500, { error: 'Failed to create guide' });
        }

        return jsonResponse(event, 201, guide);
      }
    }

    return jsonResponse(event, 405, { error: 'Method not allowed' });
  } catch (error) {
    console.error('Guides API error:', error);
    return jsonResponse(event, 500, { error: 'Internal server error' });
  }
};
