import { IPaginateActivity } from '@modules/activity/domain/models/IActivity';
import { IActivityRepository } from '@modules/activity/domain/repository/IActivityRepository';

interface IListActivity {
    page: number;
    limit: number;
}

export class ActivityListService {
    constructor(private activityRepository: IActivityRepository) {}

    public async execute(
        { page, limit }: IListActivity,
        userId: number,
    ): Promise<IPaginateActivity> {
        const skip = (page - 1) * limit;
        const activities = await this.activityRepository.findByUser(
            { page, skip, take: limit },
            userId,
        );

        return activities;
    }
}
