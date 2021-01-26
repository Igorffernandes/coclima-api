import { Router } from 'express';
import userController from './controllers/UserController';
import clientController from './controllers/ClientController';
import receiptsController from './controllers/ReceiptsController';

const routes = Router();

routes.get('/', (req, res) => res.json({ hello: 'World' }));

routes.post('/users/login', userController.login);

routes.get('/users', userController.index);
routes.post('/users', userController.create);
routes.get('/users/:id', userController.show);
routes.put('/users/:id', userController.update);
routes.delete('/users/:id', userController.deleteUser);

routes.get('/clients', clientController.index);
routes.post('/clients', clientController.create);
routes.get('/clients/:id', clientController.show);
routes.put('/clients/:id', clientController.update);
routes.delete('/clients/:id', clientController.deleteClient);

routes.get('/receipts', receiptsController.index);
routes.post('/receipts', receiptsController.create);
routes.get('/receipts/:id', receiptsController.show);
routes.put('/receipts/:id', receiptsController.update);
routes.delete('/receipts/:id', receiptsController.deleteReceipt);

export default routes;
