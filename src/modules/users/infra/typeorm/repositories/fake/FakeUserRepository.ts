import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IUser } from '@modules/users/domain/models/IUser';
import {
    IUserRepository,
    SearchParams,
} from '@modules/users/domain/repositories/IUserRepository';

export class FakeUserRepository implements IUserRepository {
    private users: IUser[] = [];
    private id = 0;

    public async findAll({
        page,
        skip,
        take,
    }: SearchParams): Promise<IPaginateUser> {
        const result = {
            per_page: take,
            total: this.users.length,
            current_page: page,
            data: this.users,
        };

        return result;
    }

    public async findByEmail(email: string): Promise<IUser | null> {
        const user = this.users.find(user => user.email === email);

        return user ? user : null;
    }

    public async create({
        email,
        name,
        password,
    }: ICreateUser): Promise<IUser> {
        ++this.id;
        const user = {
            id: this.id,
            email,
            name,
            password,
            working: false,
        };

        this.users.push(user);

        return this.users[this.id - 1];
    }
}
