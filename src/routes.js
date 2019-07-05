import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/users', UserController.list);
routes.post('/auth', SessionController.store);

routes.post('/users', authMiddleware, UserController.store);
routes.put('/users', authMiddleware, UserController.update);

export default routes;
