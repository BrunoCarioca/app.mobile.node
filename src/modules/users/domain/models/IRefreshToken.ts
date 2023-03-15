import { IUser } from './IUser';

export interface IRefreshToken {
    id: string;
    expiresIn: number;
    user: IUser;
    token: string;
}
