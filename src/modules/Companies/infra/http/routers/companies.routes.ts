import isAuthenticated from '@shared/infra/http/routes/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { CompanyController } from '../controllers/CompanyController';

export const companyRouter = Router();
const companyController = new CompanyController();

companyRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            cnpj_cpf: Joi.string().required().min(11).max(14),
            fantasia: Joi.string().required().min(3),
        },
    }),
    isAuthenticated,
    companyController.create,
);
