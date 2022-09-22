import { ConfirmCodeService } from '@modules/users/services/ConfirmCodeService/ConfirmCodeService';
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

    public async confirmCode(request: Request, response: Response): Promise<Response> {
        const code = request.query.code;
        const userRepository = new UsersRepository();
        const confirmCodeService = new ConfirmCodeService(userRepository);

        await confirmCodeService.execute(String(code));

        return response.status(200).json([]);
    }
}
