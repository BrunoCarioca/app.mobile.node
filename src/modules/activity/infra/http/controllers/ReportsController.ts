import { CreateReportService } from '@modules/activity/services/CreateReportService/CreateReportService';
import { ShowReportService } from '@modules/activity/services/ShowReportService/ShowReportService';
import { UpdateEndReportService } from '@modules/activity/services/UpdateEndReportService/UpdateEndReportService';
import { ProjectsUsersRepository } from '@modules/projects/infra/typeorm/repositories/ProjectUsersRespoitory';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { Request, Response } from 'express';
import { ActivityRepository } from '../../typeorm/repositories/ActivityRepository';
import { ReportRepository } from '../../typeorm/repositories/ReportRepository';
import { SearchReportService } from '@modules/activity/services/SearchReportService/SearchReportService';

export class ReportsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
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

        await createReportService.execute({
            activity,
            report,
            userLoginId,
            end,
        });

        return response.status(200).json([]);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const activityId = Number(request.params.activityId);
        const userLoginId = Number(request.user.id);

        const projectUsersRepository = new ProjectsUsersRepository();
        const reportRepository = new ReportRepository();
        const activityRepository = new ActivityRepository();

        const showReportService = new ShowReportService(
            projectUsersRepository,
            reportRepository,
            activityRepository,
        );
        const report = await showReportService.execute(activityId, userLoginId);

        return response.status(200).json(report);
    }

    public async updateEnd(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { end } = request.body;
        const activityId = Number(request.params.activityId);
        const userLoginId = Number(request.user.id);

        const activityRepository = new ActivityRepository();
        const reportRepository = new ReportRepository();

        const updateEndReportService = new UpdateEndReportService(
            activityRepository,
            reportRepository,
        );

        await updateEndReportService.execute(end, userLoginId, activityId);

        return response.status(200).json([]);
    }

    public async search(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const projectId = request.query.project;
        const month = request.query.month ? Number(request.query.month) : 0;

        const reportRepository = new ReportRepository();
        const searchReportService = new SearchReportService(reportRepository);

        const reports = await searchReportService.execute(
            month,
            projectId as string,
        );
        return response.status(200).json(reports);
    }
}
