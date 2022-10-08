import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { codigoRandom } from '@modules/users/providers/codigoRandom';
import { IRedisCache } from '@shared/cache/IRedisCache';
import AppError from '@shared/errors/AppError';
import Queue from '@shared/Queue/Queue';
import path from 'path';

export class ForgotPasswordService {
    constructor(private userRepository: IUserRepository, private redisCache: IRedisCache) {}

    public async execute(email: string): Promise<void> {
        let codigo: number;

        const emailExist = await this.userRepository.findByEmail(email);

        if (!emailExist) {
            throw new AppError('Email not exist!');
        }

        let codigoExist = true;

        do {
            codigo = codigoRandom();
            const codigoEmail = await this.redisCache.hashGet('codigo', String(codigo));
            if (!codigoEmail) {
                codigoExist = false;
            }
        } while (codigoExist);
        const key = await this.redisCache.hashSet('codigo', String(codigo), email);
        const forgotPasswordTemplate = path.resolve(
            __dirname,
            '..',
            '..',
            'views',
            'forgot_password.hbs',
        );

        await Queue.add('ForgotPasswordMail', { email, name: emailExist.name, codigo });
    }
}
