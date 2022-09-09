import { ICreateUser } from '../models/ICreateUser';
import { IPaginateUser } from '../models/IPaginateUser';
import { IUser } from '../models/IUser';

export type SearchParams = {
    page: number;
    skip: number;
    take: number;
};

export interface IUserRepository {
    findAll({ page, skip, take }: SearchParams): Promise<IPaginateUser>;
    findByEmail(email: string): Promise<IUser | null>;
    create({ email, name, password, role }: ICreateUser): Promise<IUser>;
}
