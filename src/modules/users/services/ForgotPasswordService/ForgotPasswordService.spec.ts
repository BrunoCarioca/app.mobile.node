import { FakeUserRepository } from '@modules/users/infra/typeorm/repositories/fake/FakeUserRepository';
import { IRedisCache } from '@shared/cache/IRedisCache';
import RedisCache from '@shared/cache/RedisCache';
import { ForgotPasswordService } from './ForgotPasswordService';

let redisCache: IRedisCache;
let fakeUserRepository: FakeUserRepository;
let forgotPasswordService: ForgotPasswordService;

describe('Test Forgot Password Service', () => {
    beforeEach(() => {
        redisCache = new RedisCache();
        fakeUserRepository = new FakeUserRepository();
        forgotPasswordService = new ForgotPasswordService(fakeUserRepository, redisCache);
    });

    // it('Email not Exist', async () => {
    //     await expect(forgotPasswordService.execute('email@teste.com')).rejects.toBeInstanceOf(
    //         AppError,
    //     );
    // });
});
