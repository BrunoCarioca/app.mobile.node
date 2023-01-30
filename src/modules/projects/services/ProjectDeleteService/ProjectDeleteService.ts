import { IProjectRepository } from '@modules/projects/domain/repositories/IProjectReposity';
import AppError from '@shared/errors/AppError';

export class ProjectDeleteService {
    constructor(private projectRepositoy: IProjectRepository) {}

    public async execute(projectId: string, userId: number): Promise<void> {
        const project = await this.projectRepositoy.findByID(projectId);
        ProjectDeleteService;

        if (!project) {
            throw new AppError('Project not found!');
        }

        if (project.admin !== userId) {
            throw new AppError('User not have permission!');
        }

        await this.projectRepositoy.delete(projectId);
    }
}
