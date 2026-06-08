/**
 * API client — defaults to Netlify Functions + Neon (/api).
 * Set VITE_API_BASE only if you host the legacy Express server.
 */
const EXPRESS_BASE = import.meta.env.VITE_API_BASE?.replace(/\/$/, '');
const API_ROOT = EXPRESS_BASE || '/api';

async function request<T>(
  path: string,
  init?: RequestInit & { skipCredentials?: boolean }
): Promise<T> {
  const { skipCredentials, ...fetchInit } = init ?? {};
  const response = await fetch(`${API_ROOT}${path}`, {
    ...fetchInit,
    credentials: skipCredentials ? 'same-origin' : 'include',
    headers: {
      'Content-Type': 'application/json',
      ...fetchInit.headers,
    },
  });

  if (!response.ok) {
    let message = 'Request failed';
    try {
      const body = await response.json();
      message = body.error || message;
    } catch {
      /* ignore */
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

export const api = {
  getGuides: (params?: { class?: string; search?: string; limit?: number; offset?: number }) => {
    const query = new URLSearchParams();
    if (params?.class) query.set('class', params.class);
    if (params?.search) query.set('search', params.search);
    if (params?.limit != null) query.set('limit', String(params.limit));
    if (params?.offset != null) query.set('offset', String(params.offset));
    const qs = query.toString();
    return request(`/guides${qs ? `?${qs}` : ''}`);
  },

  getGuide: (id: string | number) => request(`/guides/${id}`),

  createGuide: (data: {
    title: string;
    content: string;
    tf2Class?: string;
    tags?: string[];
    published?: boolean;
  }) =>
    request('/guides', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateGuide: (
    id: string | number,
    data: {
      title?: string;
      content?: string;
      tf2Class?: string;
      tags?: string[];
      published?: boolean;
    }
  ) =>
    request(`/guides/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteGuide: (id: string | number) =>
    request(`/guides/${id}`, {
      method: 'DELETE',
    }),

  rateGuide: (id: string | number, rating: number) =>
    request(`/guides/${id}/rate`, {
      method: 'POST',
      body: JSON.stringify({ rating }),
    }),

  getMyGuides: () => request('/guides/user/my-guides'),
};
