import { IProjectUsersReposity } from '@modules/projects/domain/repositories/IProjectUsersReposity';
import AppError from '@shared/errors/AppError';

interface IRemoveUsersParams {
    userId: number;
    projectId: string;
    users: number[];
}

export class RemoveUsersInProjectService {
    constructor(private projectUsersRepository: IProjectUsersReposity) {}

    public async execute({ userId, projectId, users }: IRemoveUsersParams): Promise<void> {
        const userAndProjectExist = await this.projectUsersRepository.findByUserIdAndProjectId(
            userId,
            projectId,
        );

        if (!userAndProjectExist) {
            throw new AppError('User not are in Project/Project not exist!');
        }

        if (userAndProjectExist.project.admin !== userId) {
            throw new AppError('User not have permission');
        }

        const projectUsers = await this.projectUsersRepository.findByUserAllIdsProjectId(
            users,
            projectId,
        );

        if (!projectUsers) {
            throw new AppError('Users not are in project!');
        }

        const projectsIds = projectUsers.map(projectUser => projectUser.id);

        await this.projectUsersRepository.deleteUsers(projectsIds);
    }
}
