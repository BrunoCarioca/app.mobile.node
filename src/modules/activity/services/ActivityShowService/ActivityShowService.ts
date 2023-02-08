import { IActivity } from '@modules/activity/domain/models/IActivity';
import { IActivityRepository } from '@modules/activity/domain/repository/IActivityRepository';
import AppError from '@shared/errors/AppError';

export class ActivityShowService {
    constructor(private activityRepository: IActivityRepository) {}

    public async execute(id: number, userId: number): Promise<IActivity> {
        const activity = await this.activityRepository.findById(id, userId);

        if (!activity) {
            throw new AppError('Activity not found!');
        }

        return activity;
    }
}
