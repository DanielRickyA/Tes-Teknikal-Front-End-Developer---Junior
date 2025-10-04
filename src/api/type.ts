export type ApiResponse<T = unknown> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T | null;
};

export type ApiError = {
  message: string;
  data: null;
};
