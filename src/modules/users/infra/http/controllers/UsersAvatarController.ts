import { UpdateUserAvatarService } from '@modules/users/services/UpdateUserAvatarService/UpdateUserAvatarService';
import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import { UsersRepository } from '../../typeorm/repositories/UsersRepository';

export class UsersAvatarController {
    public async udpdate(request: Request, response: Response): Promise<Response> {
        const usersRepository = new UsersRepository();
        const udpdateAvatar = new UpdateUserAvatarService(usersRepository);

        if (!request.file?.filename) {
            throw new AppError('file required');
        }

        const user = await udpdateAvatar.execute({
            userId: request.user.id,
            avatarFileName: request.file?.filename,
        });

        return response.status(200).json([]);
    }
}
