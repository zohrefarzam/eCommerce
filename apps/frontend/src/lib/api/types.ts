export type ApiErrorBody = {
  error: string;
  code?: string;
  details?: unknown;
};

export type PaginatedMeta = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: PaginatedMeta;
};

export type ApiListResponse<T> = PaginatedResponse<T> & {
  facets?: unknown;
};
