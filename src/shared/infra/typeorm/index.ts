import 'dotenv/config';
import { DataSource } from 'typeorm';
/**Entities */
// import {} from '@modules/users/infra/typeorm/entities';
/**Migrations*/
import { UsersTableCreate1658098917317 } from './migrations/1658098917317-UsersTableCreate';

export const dataSource = new DataSource({
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: process.env.APP_POSTGRES_USERNAME,
    password: process.env.APP_POSTGRES_PASSWORD,
    database: process.env.APP_POSTGRES_DATABASE,
    entities: [],
    migrations: [UsersTableCreate1658098917317],
});
