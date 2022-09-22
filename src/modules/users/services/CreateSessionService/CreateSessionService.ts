import authConfig from '@config/auth';
import { IUser } from '@modules/users/domain/models/IUser';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { BcryptHashProvider } from '@modules/users/providers/HashProvider';
import AppError from '@shared/errors/AppError';
import { sign } from 'jsonwebtoken';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: IUser;
    token: string;
}

export class CreateSessionService {
    constructor(private usersRepository: IUserRepository) {}

    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const passwordConfirmed = await BcryptHashProvider.compareHash(password, user.password);

        if (!passwordConfirmed) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const token = sign({}, authConfig.jwt.secret, {
            subject: String(user.id),
            expiresIn: authConfig.jwt.expiresIn,
        });

        return { user, token };
    }
}
