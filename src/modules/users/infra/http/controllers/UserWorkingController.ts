import { ActivityRepository } from '@modules/activity/infra/typeorm/repositories/ActivityRepository';
import { UserWorkingService } from '@modules/users/services/UserWorkingService/UserWorkingService';
import { Request, Response } from 'express';
import { UsersRepository } from '../../typeorm/repositories/UsersRepository';

export class UserWorkingController {
    public async working(request: Request, response: Response): Promise<Response> {
        const userLoginId = Number(request.user.id);

        const usersRepository = new UsersRepository();
        const activityRepository = new ActivityRepository();
        const userWorkingService = new UserWorkingService(usersRepository, activityRepository);

        await userWorkingService.execute(userLoginId);

        return response.status(200).json([]);
    }
}
