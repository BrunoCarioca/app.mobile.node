import isRefreshToken from '@shared/infra/http/routes/middlewares/isRefreshToken';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { RefreshTokenController } from '../controllers/RefreshTokenController';

export const refreshRouters = Router();
const refreshTokenController = new RefreshTokenController();

refreshRouters.post(
    '/',
    [
        celebrate({
            [Segments.BODY]: {
                refresh_token: Joi.string().uuid().required(),
            },
        }),
        isRefreshToken,
    ],
    refreshTokenController.refresh,
);
