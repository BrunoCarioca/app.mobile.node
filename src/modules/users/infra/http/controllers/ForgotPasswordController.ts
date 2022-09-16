import { ForgotPasswordService } from '@modules/users/services/ForgotPasswordService/ForgotPasswordService';
import { Request, Response } from 'express';
import { UsersRepository } from '../../typeorm/repositories/UsersRepository';

export default class ForgotPasswordController {
    public async forgotPassword(request: Request, response: Response): Promise<Response> {
        const email = request.body.email;
        const userRepository = new UsersRepository();
        const forgotPasswordService = new ForgotPasswordService(userRepository);

        await forgotPasswordService.execute(email);

        return response.status(200).json([]);
    }
}
