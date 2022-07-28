import { Router } from 'express';
import { UsersController } from '../controllers/UsersController,';

export const userRouters = Router();
const usersController = new UsersController();

userRouters.post('/', usersController.create);
