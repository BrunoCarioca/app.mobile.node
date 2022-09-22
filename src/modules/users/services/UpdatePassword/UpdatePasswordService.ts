import { IUpdatePassword } from '@modules/users/domain/models/IUpdatePassword';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { BcryptHashProvider } from '@modules/users/providers/HashProvider';
import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';

export class UpdatePasswordService {
    constructor(private userRepository: IUserRepository) {}

    public async execute({ email, password, code }: IUpdatePassword): Promise<void> {
        const redisCache = new RedisCache();
        const codeEmail = await redisCache.hashGet('codigo', code);

        if (!codeEmail) {
            throw new AppError('Code not Exist!');
        }

        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Email not Exist!');
        }

        if (email !== codeEmail) {
            throw new AppError('Code invalid!');
        }

        user.password = await BcryptHashProvider.generateHash(password);

        await this.userRepository.updatePassword(user);

        redisCache.hashDel('codigo', code);
    }
}
