import type { HandlerEvent, HandlerResponse } from '@netlify/functions';

export function getCorsHeaders(origin?: string): Record<string, string> {
  const configuredOrigin = process.env.ALLOWED_ORIGIN?.trim();
  const allowOrigin = configuredOrigin || origin || '*';

  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  };
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

export function handlePreflightOrMethod(
  event: HandlerEvent,
  allowedMethod: 'POST' = 'POST'
): HandlerResponse | null {
  const origin = event.headers.origin || event.headers.Origin;
  if (event.httpMethod === 'OPTIONS') {
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
