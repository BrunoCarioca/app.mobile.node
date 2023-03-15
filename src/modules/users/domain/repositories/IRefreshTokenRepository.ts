import { User } from '@modules/users/infra/typeorm/entities/User';
import { IRefreshToken } from '../models/IRefreshToken';

export interface IRefreshTokenRepository {
    findById(id: string): Promise<IRefreshToken | null>;
    findByUserId(id: number): Promise<IRefreshToken | null>;
    create(user: User, expiresIN: number, token: string): Promise<IRefreshToken>;
    delete(userId: number): Promise<void>;
}
