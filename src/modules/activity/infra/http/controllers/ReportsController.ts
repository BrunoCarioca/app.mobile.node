import { CreateReportService } from '@modules/activity/services/CreateReportService/CreateReportService';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { Request, Response } from 'express';
import { ActivityRepository } from '../../typeorm/repositories/ActivityRepository';
import { ReportRepository } from '../../typeorm/repositories/ReportRepository';

export class ReportsController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { end, activity, report } = request.body;
        const userLoginId = Number(request.user.id);

        const activityRepository = new ActivityRepository();
        const userRepository = new UsersRepository();
        const reportRepository = new ReportRepository();

        const createReportService = new CreateReportService(
            userRepository,
            activityRepository,
            reportRepository,
        );

        await createReportService.execute({ activity, report, userLoginId, end });

        return response.status(200).json([]);
    }
}
