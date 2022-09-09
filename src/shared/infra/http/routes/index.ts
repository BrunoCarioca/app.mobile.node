import { userRouters } from '@modules/users/infra/http/routes/users.routes';
import { Router } from 'express';
import { HateoasController } from './Hateoas/HateoasController';

export const routes = Router();
const hateoas = new HateoasController();

routes.use('/api/users', userRouters);

routes.get('/api', hateoas.index);
