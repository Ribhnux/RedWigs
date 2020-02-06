import Redis from 'ioredis';

export const redisClient = new Redis();
export const pubRedisClient = new Redis();
export const subsRedisClient = new Redis();
