import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IPaginateUser } from '@modules/users/domain/models/IPaginateUser';
import { IUser } from '@modules/users/domain/models/IUser';
import {
    IUserRepository,
    SearchParams,
} from '@modules/users/domain/repositories/IUserRepository';
import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/User';

export class UsersRepository implements IUserRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = dataSource.getRepository(User);
    }

    public async findAll({
        page,
        skip,
        take,
    }: SearchParams): Promise<IPaginateUser> {
        const [users, count] = await this.ormRepository
            .createQueryBuilder()
            .skip(skip)
            .take(take)
            .getManyAndCount();

        const result = {
            per_page: take,
            total: count,
            current_page: page,
            data: users,
        };

        return result;
    }

    public async findByEmail(email: string): Promise<IUser | null> {
        const user = await this.ormRepository.findOneBy({
            email,
        });
        return user;
    }

    public async create({
        email,
        name,
        password,
    }: ICreateUser): Promise<IUser> {
        const user = await this.ormRepository.create({
            email,
            name,
            password,
        });

        await this.ormRepository.save(user);

        return user;
    }
}
