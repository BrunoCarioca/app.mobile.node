import isAuthenticated from '@shared/infra/http/routes/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { ProjectController } from '../controllers/ProjectController';

export const projectRouters = Router();
const projecController = new ProjectController();

projectRouters.post(
    '/:companyId',
    celebrate({
        [Segments.PARAMS]: {
            companyId: Joi.string().required().uuid(),
        },
        [Segments.BODY]: {
            name: Joi.string().required().min(3),
            description: Joi.string().required().min(3).max(255),
            users: Joi.array().items(Joi.number()),
        },
    }),
    isAuthenticated,
    projecController.create,
);
