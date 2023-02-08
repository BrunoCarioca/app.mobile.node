import { IProjectUsersRepository } from '@modules/projects/domain/repositories/IProjectUsersReposity';
import AppError from '@shared/errors/AppError';

export class ShowProjectService {
    constructor(private projectsUsersRepository: IProjectUsersRepository) {}

    public async execute(userId: number, projectId: string) {
        const project = await this.projectsUsersRepository.findByUserIdAndProjectId(
            userId,
            projectId,
        );

        if (!project) {
            throw new AppError('Project not exist/User not in project');
        }

        return project.project;
    }
}
