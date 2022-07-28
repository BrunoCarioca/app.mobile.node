import { userRouters } from '@modules/users/infra/http/routes/users.routes';
import { Request, Response, Router } from 'express';

export const routes = Router();

routes.use('/api/users', userRouters);

routes.get('/api', (_request: Request, response: Response) => {
    return response.send('estou no index!');
});
