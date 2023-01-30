import { ICompaniesToUsersRepository } from '@modules/Companies/domain/repositories/ICompaniesToUsersRepository';
import { IProjectRepository } from '@modules/projects/domain/repositories/IProjectReposity';
import { IProjectUsersReposity } from '@modules/projects/domain/repositories/IProjectUsersReposity';
import { IUser } from '@modules/users/domain/models/IUser';
import AppError from '@shared/errors/AppError';

interface ICreateProjectService {
    name: string;
    admin: number;
    company: string;
    description: string;
    users: number[];
}

export class CreateProjectService {
    constructor(
        private projectsRepository: IProjectRepository,
        private projectUserRepository: IProjectUsersReposity,
        private usersCompanyRespository: ICompaniesToUsersRepository,
    ) {}

    public async exec({ name, admin, company, description, users }: ICreateProjectService) {
        const userExist = await this.usersCompanyRespository.findByCompanyIdAndUserId(
            admin,
            company,
        );

        if (!userExist) {
            throw new AppError('User not are in company or company not exist!');
        }

        if (userExist.role_user > 2) {
            throw new AppError('User not have permission!');
        }

        const usersAddExist = await this.usersCompanyRespository.findAllByCompanyIdAndUserId(
            users,
            company,
        );

        if (usersAddExist.length !== users.length) {
            throw new AppError('Users have to be in the company to Add!');
        }

        const project = await this.projectsRepository.create({
            name,
            admin,
            company: userExist.company,
            description,
        });

        const newUsers = usersAddExist.map((user): IUser => user.user);
        newUsers.push(userExist.user);

        await this.projectUserRepository.createMany({
            users: newUsers,
            project,
        });
    }
}
