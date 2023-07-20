import { IActivity } from '@modules/activity/domain/models/IActivity';
import { ActivityRepository } from '@modules/activity/infra/typeorm/repositories/ActivityRepository';
import { subDays, subMonths, startOfMonth } from 'date-fns';

export class UserHomeService {
    public constructor(private activityRepository: ActivityRepository) {}

    public async execute(
        userLoginId: number,
        month: number | null,
    ): Promise<IActivity[] | null> {
        let date = subDays(new Date(), 7);
        if (month) {
            date = startOfMonth(subMonths(new Date(), Number(month) - 1));
        }

        const activities = await this.activityRepository.findActivityLastDate(
            userLoginId,
            date,
        );

        return activities;
    }
}
