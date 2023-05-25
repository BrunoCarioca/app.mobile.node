import { IActivityRepository } from '@modules/activity/domain/repository/IActivityRepository';
import { IProjectUsersRepository } from '@modules/projects/domain/repositories/IProjectUsersReposity';
import AppError from '@shared/errors/AppError';

interface IActivityCreateService {
    activity: string;
    description: string;
    projectId: string;
    userId: number;
}

export class ActivityCreateService {
    constructor(
        private projectUsersRepository: IProjectUsersRepository,
        private activityRepository: IActivityRepository,
    ) {}

    public async execute({
        activity,
        description,
        projectId,
        userId,
    }: IActivityCreateService): Promise<void> {
        const projectUser =
            await this.projectUsersRepository.findByUserIdAndProjectId(
                userId,
                projectId,
            );

        if (!projectUser) {
            throw new AppError('User not are  in project/project not exist');
        }

        const userHasActivityOpen =
            await this.activityRepository.findByUserIdProjectIdStatus(userId);

        if (userHasActivityOpen) {
            throw new AppError(
                `The user has a pending activity. id:${userHasActivityOpen.id}`,
            );
        }

        await this.activityRepository.create({
            activity,
            description,
            user: projectUser.user,
            project: projectUser.project,
            status: false,
        });
    }
}
