import { ActivityCreateService } from '@modules/activity/services/ActivityCreateService/ActivityCreateService';
import { ActivityDeleteService } from '@modules/activity/services/ActivityDeleteService/ActivityDeleteService';
import { ActivityListService } from '@modules/activity/services/ActivityListService/ActivityListService';
import { ActivityShowService } from '@modules/activity/services/ActivityShowService/ActivityShowService';
import { ProjectsUsersRepository } from '@modules/projects/infra/typeorm/repositories/ProjectUsersRespoitory';
import { Request, Response } from 'express';
import { ActivityRepository } from '../../typeorm/repositories/ActivityRepository';

export class ActivitiesController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { activity, description, projectId } = request.body;
        const userLoginId = Number(request.user.id);

        const projectUsersRepository = new ProjectsUsersRepository();
        const activityRepository = new ActivityRepository();
        const activityCreateService = new ActivityCreateService(
            projectUsersRepository,
            activityRepository,
        );

        await activityCreateService.execute({
            activity,
            description,
            projectId,
            userId: userLoginId,
        });
        return response.status(200).json([]);
    }

    public async list(request: Request, response: Response): Promise<Response> {
        const page = request.query.page ? Number(request.query.page) : 1;
        const limit = request.query.limit ? Number(request.query.limit) : 20;

        const userLoginId = Number(request.user.id);

        const activityRepository = new ActivityRepository();
        const activityListService = new ActivityListService(activityRepository);

        const activities = await activityListService.execute({ page, limit }, userLoginId);
        return response.status(200).json(activities);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const id = Number(request.params.id);
        const userLoginId = Number(request.user.id);

        const activityRepository = new ActivityRepository();
        const activityShowService = new ActivityShowService(activityRepository);
        const activity = await activityShowService.execute(id, userLoginId);

        return response.status(200).json(activity);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const id = Number(request.params.id);
        const userLoginId = Number(request.user.id);

        const activityRepository = new ActivityRepository();
        const activityDeleteService = new ActivityDeleteService(activityRepository);
        await activityDeleteService.execute(id, userLoginId);

        return response.status(200).json([]);
    }
}
