import { IActivityRepository } from '@modules/activity/domain/repository/IActivityRepository';
import { IProjectUsersRepository } from '@modules/projects/domain/repositories/IProjectUsersReposity';
import AppError from '@shared/errors/AppError';

export class SearchActivityService {
    constructor(
        private activityRepository: IActivityRepository,
        private projectUsersRepository: IProjectUsersRepository,
    ) {}

    public async execute(name: string, projectId: string, userId: number) {
        if (!projectId) {
            const searchActivity = await this.activityRepository.searchByUserId(
                name,
                userId,
            );

            return searchActivity;
        }

        const userInProject =
            await this.projectUsersRepository.findByUserIdAndProjectId(
                userId,
                projectId,
            );

        if (!userInProject) {
            throw new AppError('User not are in project');
        }

        const searchActivity = await this.activityRepository.searchByProjectId(
            name,
            userInProject.project,
        );

        return searchActivity;
    }
}
