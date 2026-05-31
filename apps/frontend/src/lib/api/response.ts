import type { NextResponse } from 'next/server';
import type { ApiErrorBody } from '@/lib/api/types';

export function jsonOk<T>(data: T, init?: ResponseInit) {
  return Response.json(data, { status: 200, ...init });
}

export function jsonCreated<T>(data: T) {
  return Response.json(data, { status: 201 });
}

export function jsonNoContent() {
  return new Response(null, { status: 204 });
}

export function jsonError(status: number, body: ApiErrorBody): NextResponse {
  return Response.json(body, { status }) as NextResponse;
}

export function jsonNotFound(message = 'Not found') {
  return jsonError(404, { error: message, code: 'NOT_FOUND' });
}

export function jsonBadRequest(message: string) {
  return jsonError(400, { error: message, code: 'BAD_REQUEST' });
}

export function jsonUnauthorized(message = 'Unauthorized') {
  return jsonError(401, { error: message, code: 'UNAUTHORIZED' });
}

export function jsonInternalError(error: unknown) {
  const message =
    error instanceof Error ? error.message : 'Internal server error';
  return jsonError(500, { error: message, code: 'INTERNAL_ERROR' });
}

export function parseIntParam(
  value: string | null,
  fallback?: number,
): number | undefined {
  if (value === null || value === '') return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function parseStringList(value: string | null): string[] | undefined {
  if (!value) return undefined;
  const items = value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
  return items.length > 0 ? items : undefined;
}

export function parseNumberList(value: string | null): number[] | undefined {
  const strings = parseStringList(value);
  if (!strings) return undefined;
  const numbers = strings
    .map((item) => Number.parseInt(item, 10))
    .filter((item) => Number.isFinite(item));
  return numbers.length > 0 ? numbers : undefined;
}
