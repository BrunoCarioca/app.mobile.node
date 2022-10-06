import { FakeUserRepository } from '@modules/users/infra/typeorm/repositories/fake/FakeUserRepository';
import { BcryptHashProvider } from '@modules/users/providers/HashProvider';
import AppError from '@shared/errors/AppError';
import { CreateSessionService } from './CreateSessionService';

let fakeUserRepository: FakeUserRepository;
let createSessionService: CreateSessionService;

describe('Test Create Session Service', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        createSessionService = new CreateSessionService(fakeUserRepository);
    });

    it('Incorrect email not exist', async () => {
        await expect(
            createSessionService.execute({ email: 'email@teste.com', password: '12345' }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Incorrect password combination', async () => {
        const password = await BcryptHashProvider.generateHash('54321');
        const res = await fakeUserRepository.create({
            email: 'email@teste.com',
            name: 'teste',
            password,
        });

        await expect(
            createSessionService.execute({ email: 'email@teste.com', password: '12345' }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Login success', async () => {
        const password = await BcryptHashProvider.generateHash('12345');
        const res = await fakeUserRepository.create({
            email: 'email@teste.com',
            name: 'teste',
            password,
        });

        const session = await createSessionService.execute({
            email: 'email@teste.com',
            password: '12345',
        });

        expect(session).toHaveProperty('token');
        expect(session).toHaveProperty('user');
    });
});
