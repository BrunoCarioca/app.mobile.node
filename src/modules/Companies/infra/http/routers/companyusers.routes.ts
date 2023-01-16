import { CompanyUserController } from '@modules/Companies/infra/http/controllers/CompanyUsersController';
import isAuthenticated from '@shared/infra/http/routes/middlewares/isAuthenticated';
import { Router } from 'express';

export const userCompanyRouter = Router();
const companyUserController = new CompanyUserController();

userCompanyRouter.get('/', isAuthenticated, companyUserController.listCompaniesUsers);
