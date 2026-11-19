import type { HandlerEvent, HandlerResponse } from '@netlify/functions';

function normalizeOrigin(value: string): string {
  return value.trim().replace(/\/+$/, '');
}

/**
 * Parses comma-separated ALLOWED_ORIGIN values into an explicit allowlist.
 * Wildcard (*) entries are ignored to prevent insecure wildcard CORS.
 */
export function getAllowedOrigins(): string[] {
  const raw = process.env.ALLOWED_ORIGIN || '';
  return raw
    .split(',')
    .map(normalizeOrigin)
    .filter((entry) => entry.length > 0 && entry !== '*');
}

/**
 * Checks whether a request Origin matches the explicit allowlist.
 */
export function isOriginAllowed(origin?: string): boolean {
  if (!origin) {
    return false;
  }
  const normalized = normalizeOrigin(origin);
  return getAllowedOrigins().includes(normalized);
}

/**
 * Builds response headers. Only sets Access-Control-Allow-Origin when the
 * request Origin is explicitly matched in ALLOWED_ORIGIN. Never uses '*'
 * and never reflects unapproved origins.
 */
export function getCorsHeaders(origin?: string): Record<string, string> {
  const headers: Record<string, string> = {
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
    Vary: 'Origin',
  };

  if (origin && isOriginAllowed(origin)) {
    headers['Access-Control-Allow-Origin'] = normalizeOrigin(origin);
  }

  return headers;
}

export function jsonResponse(
  statusCode: number,
  body: Record<string, unknown>,
  origin?: string
): HandlerResponse {
  return {
    statusCode,
    headers: getCorsHeaders(origin),
    body: JSON.stringify(body),
  };
}

/**
 * Enforces explicit CORS origin allowlist and allowed HTTP method.
 * Rejects unapproved origins with 403 Forbidden.
 */
export function handlePreflightOrMethod(
  event: HandlerEvent,
  allowedMethod: 'POST' = 'POST'
): HandlerResponse | null {
  const origin = event.headers.origin || event.headers.Origin;

  if (origin && !isOriginAllowed(origin)) {
    return jsonResponse(403, { error: 'Origin not allowed.' });
  }

  if (event.httpMethod === 'OPTIONS') {
    if (!origin) {
      return jsonResponse(403, { error: 'Origin header required for preflight.' });
    }
    return {
      statusCode: 204,
      headers: getCorsHeaders(origin),
      body: '',
    };
  }

  if (event.httpMethod !== allowedMethod) {
    return jsonResponse(405, { error: 'Method not allowed.' }, origin);
  }

  return null;
}

export function extractBearerToken(event: HandlerEvent): string | null {
  const authHeader = event.headers.authorization || event.headers.Authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.slice('Bearer '.length).trim();
  return token.length > 0 ? token : null;
}
