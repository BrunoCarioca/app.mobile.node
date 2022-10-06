import { FakeUserRepository } from '@modules/users/infra/typeorm/repositories/fake/FakeUserRepository';
import { BcryptHashProvider } from '@modules/users/providers/HashProvider';
import { FakeRedisCache } from '@shared/cache/FakeRedisCache';
import AppError from '@shared/errors/AppError';
import { ConfirmCodeService } from './ConfirmCodeService';

let fakeRedisCache: FakeRedisCache;
let fakeUserRepository: FakeUserRepository;
let confirmCodeService: ConfirmCodeService;

describe('Test confirm code service', () => {
    beforeEach(() => {
        fakeRedisCache = new FakeRedisCache();
        fakeUserRepository = new FakeUserRepository();
        confirmCodeService = new ConfirmCodeService(fakeUserRepository, fakeRedisCache);
    });

    it('Code not register!', async () => {
        expect(confirmCodeService.execute('2222')).rejects.toBeInstanceOf(AppError);
    });

    it('Email not exist', async () => {
        await fakeRedisCache.hashSet('codigo', '2222', 'email@teste.com');
        expect(confirmCodeService.execute('2222')).rejects.toBeInstanceOf(AppError);
    });

    it('Success code!', async () => {
        const password = await BcryptHashProvider.generateHash('12345');

        await fakeUserRepository.create({
            email: 'email@teste.com',
            name: 'teste',
            password,
        });
        await fakeRedisCache.hashSet('codigo', '2222', 'email@teste.com');
        const success = await confirmCodeService.execute('2222');

        expect(success);
    });
});
