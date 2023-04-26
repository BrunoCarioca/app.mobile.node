import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import { instanceToInstance } from 'class-transformer';

export class ShowUserLoginService {
    constructor(private userRepository: IUserRepository) {}

    public async execute(id: number) {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new AppError('User not exist.');
        }

        return instanceToInstance(user);
    }
}
