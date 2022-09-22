import { compare, hash } from 'bcryptjs';

export class BcryptHashProvider {
    public static async generateHash(payload: string): Promise<string> {
        return hash(payload, 8);
    }
    public static async compareHash(payload: string, hashed: string): Promise<boolean> {
        return compare(payload, hashed);
    }
}
