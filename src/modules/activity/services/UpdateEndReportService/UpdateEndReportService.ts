import { IActivityRepository } from '@modules/activity/domain/repository/IActivityRepository';
import { IReportRepository } from '@modules/activity/domain/repository/IReportRepository';
import AppError from '@shared/errors/AppError';

export class UpdateEndReportService {
    constructor(
        private activityRepository: IActivityRepository,
        private reportRepository: IReportRepository,
    ) {}

    public async execute(end: string, userLoginId: number, activityId: number): Promise<void> {
        const activity = await this.reportRepository.findByActivityId(activityId);

        if (!activity) {
            throw new AppError('Report not found for this activity');
        }

        const activityExist = await this.activityRepository.findByOnlyActivityId(activityId);

        if (!activityExist) {
            throw new AppError('Activity not found');
        }

        if (activityExist.project.admin !== userLoginId) {
            throw new AppError('User not have permission to update this activity');
        }

        const time = new Date(String(activityExist.start));
        const endTime = end.split(':');
        time.setHours(time.getHours() + Number(endTime[0]));
        time.setMinutes(time.getMinutes() + Number(endTime[1]));
        time.setSeconds(time.getSeconds() + Number(endTime[2]));

        activityExist.end = time;

        await this.activityRepository.save(activityExist);
    }
}
