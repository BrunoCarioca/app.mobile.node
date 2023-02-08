import { ActivityCreateService } from '@modules/activity/services/ActivityCreateService/ActivityCreateService';
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
        console.log('Metodo List');
        return response.status(200).json([]);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        console.log('Metodo Show');
        return response.status(200).json([]);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        console.log('Metodo Delete');
        return response.status(200).json([]);
    }
}
