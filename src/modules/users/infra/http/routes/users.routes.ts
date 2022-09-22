import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import isAuthenticated from '../../../../../shared/infra/http/routes/middlewares/isAuthenticated';
import { UsersController } from '../controllers/UsersController,';

export const userRouters = Router();
const usersController = new UsersController();

userRouters.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required().min(3),
            email: Joi.string().required().email(),
            password: Joi.string().required(),
            password_confirmation: Joi.string().required().valid(Joi.ref('password')),
        },
    }),
    usersController.create,
);

userRouters.get('/', isAuthenticated, usersController.index);
