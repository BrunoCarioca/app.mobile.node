import '@shared/container';
import AppError from '@shared/errors/AppError';
import cors from 'cors';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import '../typeorm';
import { routes } from './routes';

const app = express();
const port = process.env.APP_PORT;

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(
    (
        error: Error,
        _request: Request,
        response: Response,
        next: NextFunction,
    ) => {
        if (error instanceof AppError) {
            return response.status(error.statusCode).json({
                status: 'error',
                message: error.message,
            });
        }

        return response.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    },
);

app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}!`);
});
