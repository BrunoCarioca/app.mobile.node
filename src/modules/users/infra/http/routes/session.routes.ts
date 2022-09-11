import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { SessionController } from '../controllers/SessionController';

export const sessionRouters = Router();
const sessionController = new SessionController();

sessionRouters.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().required().email(),
            password: Joi.string().required(),
        },
    }),
    sessionController.login,
);
