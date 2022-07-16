import { Request, Response, Router } from 'express';

export const routes = Router();

routes.get('/', (_request: Request, response: Response) => {
    return response.send('estou no index!');
});
