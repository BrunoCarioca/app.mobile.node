import isAuthenticated from '@shared/infra/http/routes/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { ReportsController } from '../controllers/ReportsController';

export const reportRouter = Router();
const reportsController = new ReportsController();

reportRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            end: Joi.string()
                .required()
                .regex(/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/),
            report: Joi.object({
                iDid: Joi.string().required().min(3),
                willDo: Joi.string().required().min(3),
                difficulty: Joi.string().required().min(3),
            }).required(),
            activity: Joi.number().required(),
        },
    }),
    isAuthenticated,
    reportsController.create,
);

reportRouter.get(
    '/:activityId',
    celebrate({
        [Segments.PARAMS]: {
            activityId: Joi.number().required(),
        },
    }),
    isAuthenticated,
    reportsController.show
);
