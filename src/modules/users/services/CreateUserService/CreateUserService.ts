import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IUser } from '@modules/users/domain/models/IUser';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { isUserRole } from '@modules/users/provider/isUserRole';
import AppError from '@shared/errors/AppError';

export class CreateUserService {
    constructor(private usersRepository: IUserRepository) {}

    public async execute({
        email,
        name,
        password,
        role,
    }: ICreateUser): Promise<IUser> {
        const emailExists = await this.usersRepository.findByEmail(email);

        if (emailExists) {
            throw new AppError('Email já cadastrado');
        }

        if (!isUserRole(role)) {
            throw new AppError('Role não permitida');
        }

        const user = await this.usersRepository.create({
            email,
            name,
            password,
            role,
        });

        return user;
    }
}
