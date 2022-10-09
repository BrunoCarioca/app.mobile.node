import uploadConfig from '@config/upload';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import fs from 'fs';
import path from 'path';

interface IRequest {
    userId: string;
    avatarFileName: string;
}

export class UpdateUserAvatarService {
    constructor(private usersRepository: IUserRepository) {}

    public async execute({ userId, avatarFileName }: IRequest): Promise<void> {
        const user = await this.usersRepository.findById(Number(userId));

        if (!user) {
            throw new AppError('User not found.');
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExist = await fs.promises.stat(userAvatarFilePath);

            if (userAvatarFileExist) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFileName;

        await this.usersRepository.save(user);
    }
}
