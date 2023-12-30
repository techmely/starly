export interface RateLimitRequest {
  id: string;
  limit: number;
  interval: number;
}

export interface RateLimitResponse {
  current: number;
  reset: number;
  passed: boolean;
}

export interface RateLimiterPort {
  limit: (req: RateLimitRequest) => Promise<RateLimitResponse>;
}
