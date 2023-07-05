import isAuthenticated from '@shared/infra/http/routes/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { UserProjectController } from '../controllers/UserProjectController';

export const usersProjectRouter = Router();
const usersProjectsController = new UserProjectController();

usersProjectRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().required().uuid(),
        },
    }),
    isAuthenticated,
    usersProjectsController.listUserInProject,
);

usersProjectRouter.post(
    '/:id',
    celebrate({
        [Segments.BODY]: {
            users: Joi.array().items(Joi.string().email()).required(),
            companyId: Joi.string().required().uuid(),
        },
        [Segments.PARAMS]: {
            id: Joi.string().required().uuid(),
        },
    }),
    isAuthenticated,
    usersProjectsController.addUserToProject,
);

usersProjectRouter.delete(
    '/:id',
    celebrate({
        [Segments.BODY]: {
            users: Joi.array().items(Joi.string().email()).required(),
        },
        [Segments.PARAMS]: {
            id: Joi.string().required().uuid(),
        },
    }),
    isAuthenticated,
    usersProjectsController.removeUserToProject,
);
