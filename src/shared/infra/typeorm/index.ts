import 'dotenv/config';
import { DataSource } from 'typeorm';
/**Entities */
import { Company } from '@modules/Companies/infra/typeorm/entities/Company';
import { CompaniesUsers } from '@modules/Companies/infra/typeorm/entities/CompanyUser';
import RefreshToken from '@modules/users/infra/typeorm/entities/RefreshToken';
import { User } from '@modules/users/infra/typeorm/entities/User';
/**Migrations*/
import { UsersTableCreate1658098917317 } from './migrations/1658098917317-UsersTableCreate';
import { RefreshUserTableCreate1662930564661 } from './migrations/1662930564661-RefreshUserTableCreate';
import { AlterTableUserAddColumnAvatar1665334283485 } from './migrations/1665334283485-AlterTableUserAddColumnAvatar';
import { CompanyTableCreate1668280838286 } from './migrations/1668280838286-CompanyTableCreate';
import { CompanyUserCreateTable1668393017875 } from './migrations/1668393017875-CompanyUserCreateTable';

export const dataSource = new DataSource({
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: process.env.APP_POSTGRES_USERNAME,
    password: process.env.APP_POSTGRES_PASSWORD,
    database: process.env.APP_POSTGRES_DATABASE,
    entities: [User, RefreshToken, Company, CompaniesUsers],
    migrations: [
        UsersTableCreate1658098917317,
        RefreshUserTableCreate1662930564661,
        AlterTableUserAddColumnAvatar1665334283485,
        CompanyTableCreate1668280838286,
        CompanyUserCreateTable1668393017875,
    ],
});
