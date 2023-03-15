import { activityRouter } from '@modules/activity/infra/http/routes/activity.routes';
import { reportRouter } from '@modules/activity/infra/http/routes/report.routes';
import { companyRouter } from '@modules/Companies/infra/http/routers/companies.routes';
import { userCompanyRouter } from '@modules/Companies/infra/http/routers/companyusers.routes';
import { companyUserRouter } from '@modules/Companies/infra/http/routers/userscompany.routes';
import { projectRouters } from '@modules/projects/infra/http/routes/projects.routes';
import { usersProjectRouter } from '@modules/projects/infra/http/routes/usersProjects.routes';
import { forgotPasswordRouter } from '@modules/users/infra/http/routes/forgotpassword.routes';
import { refreshRouters } from '@modules/users/infra/http/routes/refreshtoken.routes';
import { sessionRouters } from '@modules/users/infra/http/routes/session.routes';
import { updatePasswordRouter } from '@modules/users/infra/http/routes/updatepassword.routes';
import { userRouters } from '@modules/users/infra/http/routes/users.routes';
import { Router } from 'express';
import { HateoasController } from './Hateoas/HateoasController';

export const routes = Router();
const hateoas = new HateoasController();

routes.use('/api/users', userRouters);
routes.use('/api/session', sessionRouters);
routes.use('/api/refresh-token', refreshRouters);
routes.use('/api/forgot-password', forgotPasswordRouter);
routes.use('/api/update-password', updatePasswordRouter);
routes.use('/api/company', companyRouter);
routes.use('/api/company-users', companyUserRouter);
routes.use('/api/user-companies', userCompanyRouter);
routes.use('/api/projects', projectRouters);
routes.use('/api/user-projects', usersProjectRouter);
routes.use('/api/activities', activityRouter);
routes.use('/api/reports', reportRouter);

routes.get('/api', hateoas.index);
