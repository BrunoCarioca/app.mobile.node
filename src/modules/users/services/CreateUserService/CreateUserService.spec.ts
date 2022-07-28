import { FakeUserRepository } from '@modules/users/infra/typeorm/repositories/fake/FakeUserRepository';
import AppError from '@shared/errors/AppError';
import { CreateUserService } from './CreateUserService';

let fakeUserRepository: FakeUserRepository;
let createUserService: CreateUserService;

describe('Testar o servico de Create User', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        createUserService = new CreateUserService(fakeUserRepository);
    });

    it('Posso criar um novo usuário', async () => {
        const user = await createUserService.execute({
            email: 'teste@teste.com',
            name: 'Bruno',
            password: '12345',
            role: 'admin',
        });

        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('working');
        expect(user.id).toBe(1);
    });

    it('Não posso criar dois usuários com o mesmo email', async () => {
        await createUserService.execute({
            email: 'teste@teste.com',
            name: 'Bruno',
            password: '12345',
            role: 'admin',
        });

        expect(
            createUserService.execute({
                email: 'teste@teste.com',
                name: 'Andrei',
                password: '54321',
                role: 'admin',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Não posso criar um usuário com not isRole', async () => {
        expect(
            createUserService.execute({
                email: 'teste@teste.com',
                name: 'Andrei',
                password: '54321',
                role: 'picadasgalaxias',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
