import isAuthenticated from '@shared/infra/http/routes/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { SessionController } from '../controllers/SessionController';

export const sessionRouters = Router();
const sessionController = new SessionController();

sessionRouters.post(
    '/login',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().required().email(),
            password: Joi.string().required(),
        },
    }),
    sessionController.login,
);

sessionRouters.post('/logout', isAuthenticated, sessionController.logout);

sessionRouters.get('/me', isAuthenticated, sessionController.me);
