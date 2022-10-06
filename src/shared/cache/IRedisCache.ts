export interface IRedisCache {
    // save(key: string, value: JSON): Promise<void>;
    // recover<T>(key: string): Promise<T | null>;
    // invalidate(key: string): Promise<void>;
    hashSet(hash: string, key: string, value: string): Promise<string | null>;
    hashGet(hash: string, key: string): Promise<string | null>;
    hashDel(hash: string, key: string): Promise<number>;
}
