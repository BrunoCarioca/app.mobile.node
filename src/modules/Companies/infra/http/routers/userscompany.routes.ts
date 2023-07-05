import { CompanyUserController } from '@modules/Companies/infra/http/controllers/CompanyUsersController';
import isAuthenticated from '@shared/infra/http/routes/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

export const companyUserRouter = Router();
const companyUserController = new CompanyUserController();

companyUserRouter.get(
    '/:companyId',
    celebrate({
        [Segments.PARAMS]: {
            companyId: Joi.string().uuid().required(),
        },
    }),
    isAuthenticated,
    companyUserController.listUsersCompany,
);

companyUserRouter.post(
    '/:companyId',
    celebrate({
        [Segments.PARAMS]: {
            companyId: Joi.string().uuid().required(),
        },
        [Segments.BODY]: {
            newUserEmail: Joi.string().required().email(),
        },
    }),
    isAuthenticated,
    companyUserController.addUserToCompany,
);
