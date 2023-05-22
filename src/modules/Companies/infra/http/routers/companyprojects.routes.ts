import { Router } from 'express';
import { CompanyProjectsController } from '../controllers/CompanyProjectsController';
import isAuthenticated from '@shared/infra/http/routes/middlewares/isAuthenticated';
import { Joi, Segments, celebrate } from 'celebrate';

export const companyProjectsRouter = Router();
const companyProjectsController = new CompanyProjectsController();

companyProjectsRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    isAuthenticated,
    companyProjectsController.listCompaniesProjects,
);
