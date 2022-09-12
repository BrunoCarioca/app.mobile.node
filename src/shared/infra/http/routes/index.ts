import { refreshRouters } from '@modules/users/infra/http/routes/refreshtoken.routes';
import { sessionRouters } from '@modules/users/infra/http/routes/session.routes';
import { userRouters } from '@modules/users/infra/http/routes/users.routes';
import { Router } from 'express';
import { HateoasController } from './Hateoas/HateoasController';

export const routes = Router();
const hateoas = new HateoasController();

routes.use('/api/users', userRouters);
routes.use('/api/login', sessionRouters);
routes.use('/api/refresh-token', refreshRouters);

routes.get('/api', hateoas.index);
