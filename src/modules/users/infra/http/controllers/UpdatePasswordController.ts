import { UpdatePasswordService } from '@modules/users/services/UpdatePassword/UpdatePasswordService';
import { Request, Response } from 'express';
import { UsersRepository } from '../../typeorm/repositories/UsersRepository';

export class UpdatePasswordController {
    public async updatePassword(request: Request, response: Response): Promise<Response> {
        const { email, password, code } = request.body;

        const userRepository = new UsersRepository();
        const updatePasswordService = new UpdatePasswordService(userRepository);

        await updatePasswordService.execute({ email, password, code });

        return response.status(200).json([]);
    }
}
