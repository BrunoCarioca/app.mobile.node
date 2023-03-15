import { IActivityRepository } from '@modules/activity/domain/repository/IActivityRepository';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';

export class UserWorkingService {
    constructor(
        private userRepository: IUserRepository,
        private activityRepository: IActivityRepository,
    ) {}

    public async execute(userId: number): Promise<void> {
        const userExist = await this.userRepository.findById(userId);

        if (!userExist) {
            throw new AppError('User not exist!');
        }

        if (userExist.working) {
            throw new AppError('User already working!');
        }

        const activity = await this.activityRepository.findByUserIdStatus(userId, false);

        if (!activity) {
            throw new AppError('User not have Activity open!');
        }

        userExist.working = true;

        await this.userRepository.save(userExist);
    }
}
