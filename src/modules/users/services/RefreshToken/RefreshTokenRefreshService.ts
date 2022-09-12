import authConfig from '@config/auth';
import { IRefreshRokenRepository } from '@modules/users/domain/repositories/IRefreshTokenRepository';
import AppError from '@shared/errors/AppError';
import { fromUnixTime, isAfter } from 'date-fns';
import { sign } from 'jsonwebtoken';

export class RefreshTokenRefreshService {
    constructor(private refreshTokenRepository: IRefreshRokenRepository) {}

    public async execute(uuid: string) {
        const refreshToken = await this.refreshTokenRepository.findById(uuid);
        const date = new Date();

        if (!refreshToken) {
            throw new AppError('Token invalid');
        }

        if (isAfter(date, fromUnixTime(refreshToken.expiresIn))) {
            throw new AppError('Token expired');
        }

        const token = sign({}, authConfig.jwt.secret, {
            subject: String(refreshToken.user.id),
            expiresIn: authConfig.jwt.expiresIn,
        });

        return token;
    }
}
