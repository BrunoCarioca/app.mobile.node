import cacheConfig from '@config/cache';
import Redis, { Redis as RedisClient } from 'ioredis';

class RedisCache {
    private client: RedisClient;
    private connected = false;

    constructor() {
        if (!this.connected) {
            this.client = new Redis(cacheConfig.config.redis);
            this.connected = true;
        }
    }

    public async save(key: string, value: JSON): Promise<void> {
        await this.client.set(key, JSON.stringify(value));
    }

    public async recover<T>(key: string): Promise<T | null> {
        const data = await this.client.get(key);

        if (!data) {
            return null;
        }

        const parsedData = JSON.parse(data) as T;

        return parsedData;
    }

    public async invalidate(key: string): Promise<void> {
        await this.client.del(key);
    }

    public async hashSet(hash: string, key: string, value: string): Promise<string | null> {
        const success = await this.client.hset(hash, key, value);

        if (success === 1) {
            return key;
        }

        return null;
    }

    public async hashGet(hash: string, key: string): Promise<string | null> {
        const success = await this.client.hget(hash, key);
        if (!success) {
            return null;
        }

        return success;
    }

    public async hashDel(hash: string, key: string): Promise<number> {
        return await this.client.hdel(hash, key);
    }
}

export default new RedisCache();
