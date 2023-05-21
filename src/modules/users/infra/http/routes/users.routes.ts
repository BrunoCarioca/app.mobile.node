import uploadConfig from '@config/upload';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';
import isAuthenticated from '../../../../../shared/infra/http/routes/middlewares/isAuthenticated';
import { UsersAvatarController } from '../controllers/UsersAvatarController';
import { UsersController } from '../controllers/UsersController';
import { UserHomeController } from '../controllers/UserHomeController';

export const userRouters = Router();
const usersController = new UsersController();
const usersAvatarController = new UsersAvatarController();
const userHomeController = new UserHomeController();

const upload = multer(uploadConfig.multer);

userRouters.get(
    '/home/',
    celebrate({
        [Segments.QUERY]: {
            month: Joi.number().min(0).max(12),
            year: Joi.number().min(0),
        },
    }),
    isAuthenticated,
    userHomeController.home,
);
userRouters.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required().min(3),
            email: Joi.string().required().email(),
            password: Joi.string().required(),
            password_confirmation: Joi.string()
                .required()
                .valid(Joi.ref('password')),
        },
    }),
    usersController.create,
);

userRouters.get('/', isAuthenticated, usersController.index);

userRouters.patch(
    '/avatar',
    isAuthenticated,
    upload.single('avatar'),
    usersAvatarController.udpdate,
);

userRouters.put(
    '/:id',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required().min(3),
            email: Joi.string().required().email(),
        },
        [Segments.PARAMS]: {
            id: Joi.number().required(),
        },
    }),
    isAuthenticated,
    usersController.update,
);

userRouters.delete('/', isAuthenticated, usersController.delete);

userRouters.get('/:id', isAuthenticated, usersController.show);
