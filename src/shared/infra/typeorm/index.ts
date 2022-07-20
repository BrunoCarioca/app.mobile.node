import 'reflect-metadata';
import { createConnection } from 'typeorm';

createConnection()
    .then(() => {
        console.log('Banco de dados conectado com sucesso!');
    })
    .catch(error => {
        console.log(error);
    });
