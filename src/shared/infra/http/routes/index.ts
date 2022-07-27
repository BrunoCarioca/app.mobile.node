import { Request, Response, Router } from 'express';
import usersRouter from 'src/modules/users/infra/http/routes/users.routers';

export const routes = Router();

routes.use('/api/users', usersRouter);

routes.get('/api', (_request: Request, response: Response) => {
    return response.send('estou no index!');
});

/*

    endpoints


     
    api/usuario
    api/projetos
    
*/
