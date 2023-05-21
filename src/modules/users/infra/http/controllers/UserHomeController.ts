import { UserHomeService } from '@modules/users/services/UserHomeService/UserHomeService';
import { Request, Response } from 'express';
import { ActivityRepository } from '@modules/activity/infra/typeorm/repositories/ActivityRepository';

export class UserHomeController {
    public async home(request: Request, response: Response): Promise<Response> {
        const userLoginId = Number(request.user.id);
        const month = request.query.month ? Number(request.query.month) : null;

        const activityRepository = new ActivityRepository();

        const userHomeService = new UserHomeService(activityRepository);
        const activities = await userHomeService.execute(userLoginId, month);

        return response.status(200).json(activities);
    }
}
