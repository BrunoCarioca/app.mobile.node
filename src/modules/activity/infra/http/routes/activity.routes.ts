import isAuthenticated from '@shared/infra/http/routes/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { ActivitiesController } from '../controllers/ActivitiesController';

export const activityRouter = Router();
const activitiesController = new ActivitiesController();

activityRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            activity: Joi.string().required().min(3).max(255),
            description: Joi.string().required().min(3).max(255),
            projectId: Joi.string().required().uuid(),
        },
    }),
    isAuthenticated,
    activitiesController.create,
);

activityRouter.get('/', isAuthenticated, activitiesController.list);

activityRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().required(),
        },
    }),
    isAuthenticated,
    activitiesController.show,
);

activityRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().required(),
        },
    }),
    isAuthenticated,
    activitiesController.delete,
);
