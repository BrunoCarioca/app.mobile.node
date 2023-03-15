import authConfig from '@config/auth';
import { IRefreshToken } from '@modules/users/domain/models/IRefreshToken';
import { IUser } from '@modules/users/domain/models/IUser';
import { IRefreshTokenRepository } from '@modules/users/domain/repositories/IRefreshTokenRepository';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { BcryptHashProvider } from '@modules/users/providers/HashProvider';
import AppError from '@shared/errors/AppError';
import { addDays, getUnixTime } from 'date-fns';
import { sign } from 'jsonwebtoken';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: IUser;
    refreshToken: IRefreshToken;
}

export class CreateSessionService {
    constructor(
        private usersRepository: IUserRepository,
        private refreshTokenRepository: IRefreshTokenRepository,
    ) {}

    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);
        const date = new Date();
        const expiresIn = getUnixTime(addDays(date, 3));

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

        await this.refreshTokenRepository.delete(user.id);

        const refreshToken = await this.refreshTokenRepository.create(user, expiresIn, token);

        return { user, refreshToken };
    }
}
