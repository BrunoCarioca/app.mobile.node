import { IUser } from './IUser';

export interface IRefreshToken {
    id: string;
    expiresIn: number;
    user: IUser;
    created_at: Date;
    updated_at: Date;
}
