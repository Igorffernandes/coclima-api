import { Router } from 'express';
import userController from './controllers/UserController';
import clientController from './controllers/ClientController';
import receiptsController from './controllers/ReceiptsController';
import authController from './controllers/AuthController';
import authMiddleware from './middlewares/authMiddleware';

const routes = Router();

routes.get('/', (req, res) => res.json({ hello: 'World' }));

routes.post('/login', authController.login);

routes.get('/users', authMiddleware, userController.index);
routes.post('/users', authMiddleware, userController.create);
routes.get('/users/:id', authMiddleware, userController.show);
routes.put('/users/:id', authMiddleware, userController.update);
routes.delete('/users/:id', authMiddleware, userController.deleteUser);

routes.get('/clients', authMiddleware, clientController.index);
routes.post('/clients', authMiddleware, clientController.create);
routes.get('/clients/:id', authMiddleware, clientController.show);
routes.put('/clients/:id', authMiddleware, clientController.update);
routes.delete('/clients/:id', authMiddleware, clientController.deleteClient);

routes.get('/receipts', authMiddleware, receiptsController.index);
routes.post('/receipts', authMiddleware, receiptsController.create);
routes.get('/receipts/:id', authMiddleware, receiptsController.show);
routes.put('/receipts/:id', authMiddleware, receiptsController.update);
routes.delete('/receipts/:id', authMiddleware, receiptsController.deleteReceipt);

export default routes;
