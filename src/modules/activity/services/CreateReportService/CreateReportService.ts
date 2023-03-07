import { IActivityRepository } from '@modules/activity/domain/repository/IActivityRepository';
import { IReportRepository } from '@modules/activity/domain/repository/IReportRepository';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';

interface IReportRequest {
    iDid: string;
    willDo: string;
    difficulty: string;
}

interface ICreateReportService {
    activity: number;
    report: IReportRequest;
    userLoginId: number;
    end: string;
}

export class CreateReportService {
    constructor(
        private userRepository: IUserRepository,
        private activityRepository: IActivityRepository,
        private reportRepository: IReportRepository,
    ) {}

    public async execute({
        activity,
        report,
        userLoginId,
        end,
    }: ICreateReportService): Promise<void> {
        const activityExist = await this.activityRepository.findById(activity, userLoginId);

        if (!activityExist) {
            throw new AppError('Activity not Exist/user not have this activity!');
        }

        if (activityExist.status) {
            throw new AppError('Activity has ended');
        }

        const user = await this.userRepository.findById(userLoginId);

        if (!user?.working) {
            throw new AppError('User not working');
        }

        const reportExist = await this.reportRepository.findByActivityId(activity);

        if (reportExist) {
            throw new AppError('this activity has report');
        }

        const time = activityExist.start;
        const endTime = end.split(':');
        time.setHours(time.getHours() + Number(endTime[0]));
        time.setMinutes(time.getMinutes() + Number(endTime[1]));
        time.setSeconds(time.getSeconds() + Number(endTime[2]));

        activityExist.status = true;
        activityExist.end = time;

        await this.activityRepository.save(activityExist);
        const newReport = JSON.stringify(report);
        await this.reportRepository.create({ report: newReport, activity: activityExist });

        user.working = false;
        await this.userRepository.save(user);
    }
}
