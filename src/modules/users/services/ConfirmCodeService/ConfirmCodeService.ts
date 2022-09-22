import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';

export class ConfirmCodeService {
    constructor(private userRepository: IUserRepository) {}

    public async execute(code: string): Promise<void> {
        const redisCache = new RedisCache();
        const email = await redisCache.hashGet('codigo', code);

        if (!email) {
            throw new AppError('Code not Register!');
        }

        const emailExist = await this.userRepository.findByEmail(email);

        if (!emailExist) {
            throw new AppError('Email not Exit');
        }
    }
}
