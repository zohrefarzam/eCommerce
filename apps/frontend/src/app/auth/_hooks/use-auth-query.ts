'use client';

import { useQuery } from '@tanstack/react-query';
import { authQueryKeys } from '@/app/auth/_lib/api/query-keys';
import { fetchAuthSession } from '@/app/auth/_lib/api/service';

export function useAuthSessionQuery() {
  return useQuery({
    queryKey: authQueryKeys.session(),
    queryFn: fetchAuthSession,
  });
}
