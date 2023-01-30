import { IProjectRepository } from '@modules/projects/domain/repositories/IProjectReposity';
import AppError from '@shared/errors/AppError';

export interface IProjectUpdate {
    name: string;
    description: string;
    projectId: string;
    userId: number;
}

export class ProjectUpdateService {
    constructor(private projectRepository: IProjectRepository) {}

    public async execute({ name, description, projectId, userId }: IProjectUpdate): Promise<void> {
        if (!(name || description)) {
            return;
        }

        const project = await this.projectRepository.findByID(projectId);

        if (!project) {
            throw new AppError('Project not found!');
        }
        if (userId !== project.admin) {
            throw new AppError('User not have permission!');
        }

        project.name = name ?? project.name;
        project.description = description ?? project.description;

        await this.projectRepository.save(project);
    }
}
