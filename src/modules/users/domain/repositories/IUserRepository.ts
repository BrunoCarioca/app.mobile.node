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
    findByAllEmail(emails: string[]): Promise<IUser[] | null>;
    findById(id: number): Promise<IUser | null>;
    delete(id: number): Promise<void>;
    create({ email, name, password }: ICreateUser): Promise<IUser>;
    save(user: IUser): Promise<IUser>;
}
