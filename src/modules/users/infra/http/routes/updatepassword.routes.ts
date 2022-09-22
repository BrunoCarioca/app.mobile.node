import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { UpdatePasswordController } from '../controllers/UpdatePasswordController';

export const updatePasswordRouter = Router();
const updatePasswordController = new UpdatePasswordController();

updatePasswordRouter.patch(
    '/',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            confirm_password: Joi.string().required().valid(Joi.ref('password')),
            code: Joi.string().required().min(4),
        },
    }),
    updatePasswordController.updatePassword,
);
