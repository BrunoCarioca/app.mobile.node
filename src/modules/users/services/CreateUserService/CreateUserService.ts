import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IUser } from '@modules/users/domain/models/IUser';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';

export class CreateUserService {
    constructor(private usersRepository: IUserRepository) {}

    public async execute({
        email,
        name,
        password,
    }: ICreateUser): Promise<IUser> {
        const emailExists = await this.usersRepository.findByEmail(email);

        if (emailExists) {
            throw new AppError('Email já cadastrado');
        }

        const user = await this.usersRepository.create({
            email,
            name,
            password,
        });

        return user;
    }
}
