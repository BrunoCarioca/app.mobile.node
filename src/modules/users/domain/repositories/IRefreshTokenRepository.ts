import { User } from '@modules/users/infra/typeorm/entities/User';
import { IRefreshToken } from '../models/IRefreshToken';

export interface IRefreshTokenRepository {
    findById(id: string): Promise<IRefreshToken | null>;
    findByUserId(id: number): Promise<IRefreshToken | null>;
    create(user: User, expiresIN: number): Promise<IRefreshToken>;
    delete(id: string): Promise<void>;
}
