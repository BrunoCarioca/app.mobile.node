import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';

export class DeleteUserService {
    constructor(private usersRepository: IUserRepository) {}

    public async execute(id: number) {
        const user = await this.usersRepository.findById(id);

        if (!user) {
            throw new AppError('User not found');
        }

        await this.usersRepository.delete(id);
    }
}
