import { IActivityRepository } from '@modules/activity/domain/repository/IActivityRepository';
import AppError from '@shared/errors/AppError';

export class ActivityDeleteService {
    constructor(private activityRepository: IActivityRepository) {}

    public async execute(id: number, userId: number): Promise<void> {
        const activity = await this.activityRepository.findById(id, userId);

        if (!activity) {
            throw new AppError('Activity not found!');
        }

        await this.activityRepository.delete(id);
    }
}
