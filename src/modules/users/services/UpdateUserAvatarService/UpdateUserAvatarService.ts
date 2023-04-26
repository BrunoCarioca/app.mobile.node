import uploadConfig from '@config/upload';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';
import S3StorageProvider from '@shared/providers/StorageProvider/S3StorageProvider';
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

        if (uploadConfig.driver === 's3') {
            const s3Provider = new S3StorageProvider();
            if (user.avatar) {
                await s3Provider.deleteFile(user.avatar);
            }
            const filename = await s3Provider.saveFile(avatarFileName);
            user.avatar = filename;
        } else {
            const diskProvider = new DiskStorageProvider();
            if (user.avatar) {
                await diskProvider.deleteFile(user.avatar);
            }
            const filename = await diskProvider.saveFile(avatarFileName);
            user.avatar = filename;
        }

        await this.usersRepository.save(user);
    }
}
