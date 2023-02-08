import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import { instanceToInstance } from 'class-transformer';

export class UpdateUserService {
    constructor(private usersRepository: IUserRepository) {}

    public async execute(id: number, newName: string, newEmail: string, userLoginId: number) {
        const user = await this.usersRepository.findById(id);
        const emailExist = await this.usersRepository.findByEmail(newEmail);

        if (!user) {
            throw new AppError('User not exist.');
        }

        if(user.id !== userLoginId) {
            throw new AppError('Email not are correct!');
        }

        if (emailExist && emailExist.id !== id) {
            throw new AppError('There is already one user with this email.');
        }

        user.email = newEmail;
        user.name = newName;

        return instanceToInstance(await this.usersRepository.save(user));
    }
}
