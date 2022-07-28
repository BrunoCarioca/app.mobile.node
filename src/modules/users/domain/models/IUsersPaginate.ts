import { IUser } from './IUser';

export interface IUsersPaginate {
    per_page: number;
    total: number;
    current_page: number;
    data: IUser[];
}
