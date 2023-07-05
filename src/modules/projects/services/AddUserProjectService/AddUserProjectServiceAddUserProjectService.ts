import { ICompaniesToUsersRepository } from '@modules/Companies/domain/repositories/ICompaniesToUsersRepository';
import { IProjectRepository } from '@modules/projects/domain/repositories/IProjectReposity';
import { IProjectUsersRepository } from '@modules/projects/domain/repositories/IProjectUsersReposity';
import { IUser } from '@modules/users/domain/models/IUser';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';

interface IAddUserProject {
    userId: number;
    projectId: string;
    users: string[];
    companyId: string;
}

export class AddUserProjectService {
    constructor(
        private usersCompanyRespository: ICompaniesToUsersRepository,
        private projectsUsersRepository: IProjectUsersRepository,
    ) {}

    public async execute({
        userId,
        projectId,
        users,
        companyId,
    }: IAddUserProject): Promise<void> {
        const useIsAdmin =
            await this.usersCompanyRespository.findByCompanyIdAndUserId(
                userId,
                companyId,
            );

        if (!useIsAdmin) {
            throw new AppError('User not are in company or company not exist!');
        }

        if (useIsAdmin.role_user > 2) {
            throw new AppError('User not have permission!');
        }

        const usersAddExistInCompany =
            await this.usersCompanyRespository.findAllByCompanyIdAndUserEmail(
                users,
                companyId,
            );

        if (
            !usersAddExistInCompany ||
            usersAddExistInCompany.length !== users.length
        ) {
            throw new AppError('Users not exist or not are in company!');
        }

        const usersAddExistInProject =
            await this.projectsUsersRepository.findByUserAllEmailProjectId(
                users,
                projectId,
            );

        if (usersAddExistInProject && usersAddExistInProject.length > 0) {
            throw new AppError('Users already are in project!');
        }

        const userAdmin =
            await this.projectsUsersRepository.findByUserIdAndProjectId(
                userId,
                projectId,
            );

        if (!userAdmin) {
            throw new AppError('User not are in project!');
        }

        if (userAdmin.project.admin !== userId) {
            throw new AppError('User not have permission!');
        }

        if (userAdmin.project.company.id !== companyId) {
            throw new AppError('project not are in company!');
        }

        const newUsers = usersAddExistInCompany.map(
            (companiesUsers): IUser => companiesUsers.user,
        );

        await this.projectsUsersRepository.createMany({
            users: newUsers,
            project: userAdmin.project,
        });
    }
}
