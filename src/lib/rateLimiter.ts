interface RateLimit {
  count: number;
  firstRequest: number;
}

const WINDOW_MS = 3600000; // 1 hour
const MAX_REQUESTS = 3; // Max 3 attempts per hour

const rateLimits = new Map<string, RateLimit>();

export function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const limit = rateLimits.get(identifier);

  // Clean up old entries
  if (limit && now - limit.firstRequest >= WINDOW_MS) {
    rateLimits.delete(identifier);
  }

  if (!rateLimits.has(identifier)) {
    rateLimits.set(identifier, {
      count: 1,
      firstRequest: now
    });
    return true;
  }

  const currentLimit = rateLimits.get(identifier)!;
  
  if (currentLimit.count >= MAX_REQUESTS) {
    return false;
  }

  currentLimit.count++;
  return true;
}