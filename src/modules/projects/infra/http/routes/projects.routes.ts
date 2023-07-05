import isAuthenticated from '@shared/infra/http/routes/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { ProjectController } from '../controllers/ProjectController';

export const projectRouters = Router();
const projectController = new ProjectController();

projectRouters.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required().min(3),
            description: Joi.string().required().min(3).max(255),
            users: Joi.array().required().items(Joi.string().email()),
            companyId: Joi.string().required().uuid(),
        },
    }),
    isAuthenticated,
    projectController.create,
);

projectRouters.get('/', isAuthenticated, projectController.list);

projectRouters.put(
    '/:projectId',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().min(3).max(255),
            description: Joi.string().min(3).max(255),
        },
        [Segments.PARAMS]: {
            projectId: Joi.string().required().uuid(),
        },
    }),
    isAuthenticated,
    projectController.update,
);

projectRouters.delete(
    '/:projectId',
    celebrate({
        [Segments.PARAMS]: {
            projectId: Joi.string().required().uuid(),
        },
    }),
    isAuthenticated,
    projectController.delete,
);

projectRouters.get(
    '/search',
    celebrate({
        [Segments.QUERY]: {
            name: Joi.string(),
        },
    }),
    isAuthenticated,
    projectController.search,
);

projectRouters.get(
    '/:projectId',
    celebrate({
        [Segments.PARAMS]: {
            projectId: Joi.string().required().uuid(),
        },
    }),
    isAuthenticated,
    projectController.show,
);
