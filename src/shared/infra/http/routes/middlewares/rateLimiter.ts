import { Request, Response, NextFunction } from 'express';
import cacheConfig from '@config/cache';
import Redis from 'ioredis';
import AppError from '@shared/errors/AppError';
import { RateLimiterRedis } from 'rate-limiter-flexible';

export default async function rateLimiter(
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const redisClient = new Redis(cacheConfig.config.redis);
        const limiter = new RateLimiterRedis({
            storeClient: redisClient,
            keyPrefix: 'ratelimit',
            points: 5,
            duration: 1,
        });

        await limiter.consume(request.ip);
        return next();
    } catch (error) {
        throw new AppError('Too many requests', 429);
    }
}
