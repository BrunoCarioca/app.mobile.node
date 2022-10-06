import { IRedisCache } from './IRedisCache';

export class FakeRedisCache implements IRedisCache {
    private hash = new Map();

    public async hashSet(hash: string, key: string, value: string): Promise<string | null> {
        this.hash.set(key, value);
        return this.hash.get(key);
    }

    public async hashGet(hash: string, key: string): Promise<string | null> {
        return this.hash.get(key);
    }

    public async hashDel(hash: string, key: string): Promise<number> {
        return this.hash.delete(key) ? 1 : 0;
    }
}
