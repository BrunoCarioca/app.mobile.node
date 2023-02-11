import 'dotenv/config';
import 'reflect-metadata';
import { dataSource } from '../typeorm';
import { app } from './app';

dataSource
    .initialize()
    .then(async () => {
        app.listen(process.env.APP_PORT || 3000, () => {
            console.log(`Servidor rodando na porta http://localhost:${process.env.APP_PORT} !`);
        });
    })
    .catch(error => console.log(error));
