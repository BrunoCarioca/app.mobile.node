import { IActivityRepository } from '@modules/activity/domain/repository/IActivityRepository';
import { IReportRepository } from '@modules/activity/domain/repository/IReportRepository';
import { IProjectUsersRepository } from '@modules/projects/domain/repositories/IProjectUsersReposity';
import AppError from '@shared/errors/AppError';

export class ShowReportService {
    constructor(
        private projectUsersRepository: IProjectUsersRepository,
        private reportRepository: IReportRepository,
        private activityRepository: IActivityRepository,
    ) {}

    public async execute(activityId: number, userLoginId: number) {
        const report = await this.reportRepository.findByActivityId(activityId);

        if (!report) {
            throw new AppError('report not found!');
        }

        const activity = await this.activityRepository.findByIdRelentions(activityId);

        if (!activity || !activity.status) {
            throw new AppError('Activity not exist/Activity is open');
        }

        const project_user = await this.projectUsersRepository.findByUserIdAndProjectId(
            userLoginId,
            activity.project.id,
        );

        if (!project_user) {
            throw new AppError('User not have permission to see that report');
        }

        let reportResponse = report;
        reportResponse.report = JSON.parse(report.report);

        return reportResponse;
    }
}
