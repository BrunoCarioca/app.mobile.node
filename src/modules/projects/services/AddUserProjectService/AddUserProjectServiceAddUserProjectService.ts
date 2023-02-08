import { ICompaniesToUsersRepository } from '@modules/Companies/domain/repositories/ICompaniesToUsersRepository';
import { IProjectRepository } from '@modules/projects/domain/repositories/IProjectReposity';
import { IProjectUsersRepository } from '@modules/projects/domain/repositories/IProjectUsersReposity';
import { IUser } from '@modules/users/domain/models/IUser';
import AppError from '@shared/errors/AppError';

interface IAddUserProject {
    userId: number;
    projectId: string;
    users: number[];
    companyId: string;
}

export class AddUserProjectService {
    constructor(
        private usersCompanyRespository: ICompaniesToUsersRepository,
        private projectsUsersRepository: IProjectUsersRepository,
        private projectRespository: IProjectRepository,
    ) {}

    public async execute({ userId, projectId, users, companyId }: IAddUserProject): Promise<void> {
        const isUserAdmin = await this.projectsUsersRepository.findByUserIdAndProjectId(
            userId,
            projectId,
        );

        if (!isUserAdmin) {
            throw new AppError('Project not found!');
        }

        if (isUserAdmin.project.admin !== userId) {
            throw new AppError('User not have permission!');
        }

        const usersAddExist = await this.usersCompanyRespository.findAllByCompanyIdAndUserId(
            users,
            companyId,
        );

        if (usersAddExist.length !== users.length) {
            throw new AppError('Users have to be in the company to Add!');
        }

        const project = await this.projectRespository.findByID(projectId);

        if (!project) {
            throw new AppError('project not exist');
        }

        if (project.company.id !== companyId) {
            throw new AppError('Project not found in company!');
        }

        const usersInProject = await this.projectsUsersRepository.findByUserAllIdsProjectId(
            users,
            projectId,
        );

        if (usersInProject?.length !== 0) {
            throw new AppError('User are already in project!');
        }

        const newUsers = usersAddExist.map((user): IUser => user.user);

        await this.projectsUsersRepository.createMany({
            users: newUsers,
            project,
        });
    }
}
