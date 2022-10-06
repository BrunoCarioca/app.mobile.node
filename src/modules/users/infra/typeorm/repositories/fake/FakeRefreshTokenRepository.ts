import { IRefreshToken } from '@modules/users/domain/models/IRefreshToken';
import { IRefreshTokenRepository } from '@modules/users/domain/repositories/IRefreshTokenRepository';
import { v4 as uuid } from 'uuid';
import { User } from '../../entities/User';

export class FakeRefreshTokenRepository implements IRefreshTokenRepository {
    private tokens: IRefreshToken[] = [];

    public async findByUserId(id: number): Promise<IRefreshToken | null> {
        const token = this.tokens.find(token => token.user.id === id);
        return token ? token : null;
    }

    public async findById(id: string): Promise<IRefreshToken | null> {
        const token = this.tokens.find(token => token.id === id);
        return token ? token : null;
    }

    public async create(user: User, expiresIN: number): Promise<IRefreshToken> {
        const token = {
            id: uuid(),
            expiresIn: expiresIN,
            user: user,
            created_at: new Date(),
            updated_at: new Date(),
        };

        const length = this.tokens.push(token);
        return this.tokens[length - 1];
    }

    public async delete(id: string): Promise<void> {
        this.tokens = this.tokens.filter(token => token.id !== id);
    }
}
