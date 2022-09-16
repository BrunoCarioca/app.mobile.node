import Mail from '@config/mail/Mail';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { codigoRandom } from '@modules/users/providers/codigoRandom';
import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import path from 'path';

export class ForgotPasswordService {
    constructor(private userRepository: IUserRepository) {}

    public async execute(email: string): Promise<void> {
        let codigo: number;
        const redisCache = new RedisCache();
        console.log(email);

        const emailExist = await this.userRepository.findByEmail(email);

        if (!emailExist) {
            throw new AppError('Email not exist!');
        }

        let codigoExist = true;

        do {
            codigo = codigoRandom();
            const codigoEmail = await redisCache.hashGet('codigo', String(codigo));
            if (!codigoEmail) {
                codigoExist = false;
            }
        } while (codigoExist);
        const key = await redisCache.hashSet('codigo', String(codigo), email);
        const forgotPasswordTemplate = path.resolve(
            __dirname,
            '..',
            '..',
            'views',
            'forgot_password.hbs',
        );

        console.log(forgotPasswordTemplate);

        await Mail.sendMail({
            to: {
                name: 'testeNome',
                email,
            },
            subject: '[API TCC] Recuperação de senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: emailExist.name,
                    codigo,
                },
            },
        });
    }
}
