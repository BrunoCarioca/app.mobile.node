export interface IUser {
    id: number;
    email: string;
    name: string;
    password: string;
    working: boolean;
    created_at?: Date;
    update_at?: Date;
}
