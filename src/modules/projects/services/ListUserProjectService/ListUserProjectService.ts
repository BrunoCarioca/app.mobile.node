import { IProjectUsersRepository } from '@modules/projects/domain/repositories/IProjectUsersReposity';
import AppError from '@shared/errors/AppError';

interface IListUserProjectService {
    userId: number;
    projectId: string;
}

interface IReturn {
    id: number;
    email: string;
    name: string;
    working: boolean;
    avatar: string | null;
}

export class ListUserProjectService {
    constructor(private projectUsersRepository: IProjectUsersRepository) {}

    public async execute({ userId, projectId }: IListUserProjectService): Promise<IReturn[]> {
        const userInProject = await this.projectUsersRepository.findByUserIdAndProjectId(
            userId,
            projectId,
        );

        if (!userInProject) {
            throw new AppError('User not are in Project!');
        }

        const projectsUsers = await this.projectUsersRepository.findByProjectID(projectId);

        if (!projectsUsers) {
            throw new AppError('Users not found');
        }

        const users: IReturn[] = projectsUsers.map(projectUser => {
            return {
                id: projectUser.user.id,
                name: projectUser.user.name,
                email: projectUser.user.email,
                working: projectUser.user.working,
                avatar: projectUser.user.getAvatarUrl(),
            };
        });

        return users;
    }
}
