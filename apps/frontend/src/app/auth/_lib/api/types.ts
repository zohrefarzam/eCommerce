import type { UserRole } from '@/providers/_lib/auth-store';

export type AuthUserDto = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type AuthSessionResponse = {
  user: AuthUserDto | null;
};

export type SignInRequest = {
  email: string;
  password: string;
};

export type SignUpRequest = {
  name: string;
  email: string;
  password: string;
};

export type AuthActionResponse = {
  user: AuthUserDto;
};
