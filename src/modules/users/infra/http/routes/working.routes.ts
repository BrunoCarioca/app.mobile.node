import isAuthenticated from '@shared/infra/http/routes/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { UserWorkingController } from '../controllers/UserWorkingController';

export const workingRouter = Router();
const userWorkingController = new UserWorkingController();

workingRouter.put('/', isAuthenticated, userWorkingController.working);
