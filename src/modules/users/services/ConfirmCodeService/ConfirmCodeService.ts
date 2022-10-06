import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { IRedisCache } from '@shared/cache/IRedisCache';
import AppError from '@shared/errors/AppError';

export class ConfirmCodeService {
    constructor(private userRepository: IUserRepository, private redisCache: IRedisCache) {}

    public async execute(code: string): Promise<boolean> {
        const email = await this.redisCache.hashGet('codigo', code);

        if (!email) {
            throw new AppError('Code not Register!');
        }

        const emailExist = await this.userRepository.findByEmail(email);

        if (!emailExist) {
            throw new AppError('Email not Exit');
        }

        return true;
    }
}
