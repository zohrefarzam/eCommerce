import { apiFetch } from '@/lib/api/client';
import type {
  AuthActionResponse,
  AuthSessionResponse,
  SignInRequest,
  SignUpRequest,
} from '@/app/auth/_lib/api/types';

export function fetchAuthSession() {
  return apiFetch<AuthSessionResponse>('/auth/session');
}

export function signIn(input: SignInRequest) {
  return apiFetch<AuthActionResponse>('/auth/login', {
    method: 'POST',
    body: input,
  });
}

export function signUp(input: SignUpRequest) {
  return apiFetch<AuthActionResponse>('/auth/sign-up', {
    method: 'POST',
    body: input,
  });
}

export function signOutSession() {
  return apiFetch<void>('/auth/session', { method: 'DELETE' });
}
