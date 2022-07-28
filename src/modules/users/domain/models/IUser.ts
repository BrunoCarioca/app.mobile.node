export type UserRole = 'admin' | 'manager' | 'standard';

export interface IUser {
    id: number;
    email: string;
    name: string;
    password: string;
    role: string;
    working: boolean;
    created_at?: Date;
    update_at?: Date;
}
