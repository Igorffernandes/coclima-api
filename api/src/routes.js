import { Router } from 'express';
import userController from './controllers/UserController';
import clientController from './controllers/ClientController';
import receiptsController from './controllers/ReceiptsController';

const routes = Router();

routes.get('/', (req, res) => res.json({ hello: 'World' }));

routes.post('/users', userController.create);
routes.post('/users/login', userController.login);

routes.post('/clients', clientController.create);

routes.post('/receipts', receiptsController.create);

export default routes;
