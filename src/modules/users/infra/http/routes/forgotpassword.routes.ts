import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';

export const forgotPasswordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();

forgotPasswordRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
        },
    }),
    forgotPasswordController.forgotPassword,
);

forgotPasswordRouter.get(
    '/',
    celebrate({
        [Segments.QUERY]: {
            code: Joi.string().min(4).required(),
        },
    }),
    forgotPasswordController.confirmCode,
);
