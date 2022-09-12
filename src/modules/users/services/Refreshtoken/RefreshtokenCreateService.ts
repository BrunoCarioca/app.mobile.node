import { IUser } from '@modules/users/domain/models/IUser';
import { IRefreshRokenRepository } from '@modules/users/domain/repositories/IRefreshTokenRepository';
import { addDays, getUnixTime } from 'date-fns';

interface IReturn {
    expiresIn: number;
    user: IUser;
    id: string;
}

export class RefreshtokenCreateService {
    constructor(private refreshTokenRepository: IRefreshRokenRepository) {}

    public async execute(user: IUser): Promise<IReturn> {
        const date = new Date();
        const expiresIn = getUnixTime(addDays(date, 3));

        const isExistRefreshToken =
            await this.refreshTokenRepository.findByUserId(user.id);

        if (isExistRefreshToken) {
            await this.refreshTokenRepository.delete(isExistRefreshToken.id);
        }

        const refreshToken = await this.refreshTokenRepository.create(
            user,
            expiresIn,
        );

        return refreshToken;
    }
}
