import { Router } from 'express';
import userController from './controllers/UserController';
import companyController from './controllers/CompanyController';
import receiptsController from './controllers/ReceiptsController';
import authController from './controllers/AuthController';
import archiveController from './controllers/ArchivesController';
import plantationController from './controllers/PlantationController';
import authMiddleware from './middlewares/authMiddleware';
import DashboardController from './controllers/DashboardController';

import TrayController from './controllers/TrayController';

const routes = Router();

routes.get('/', (req, res) => res.json({ hello: 'World' }));
routes.get('/dashboard', authMiddleware, DashboardController.show);

routes.post('/login', authController.login);

routes.get('/users', authMiddleware, userController.index);
routes.post('/users', authMiddleware, userController.create);
routes.get('/users/:id', authMiddleware, userController.getUser);
routes.put('/users/:id', authMiddleware, userController.update);
routes.delete('/users/:id', authMiddleware, userController.deleteUser);

routes.get('/companies', authMiddleware, companyController.index);
routes.post('/companies', authMiddleware, companyController.create);
routes.get('/companies/:id', authMiddleware, companyController.show);
routes.put('/companies/:id', authMiddleware, companyController.update);
routes.delete('/companies/:id', authMiddleware, companyController.deleteClient);

routes.get('/receipts', authMiddleware, receiptsController.index);
routes.post('/receipts', authMiddleware, receiptsController.create);
routes.get('/receipts/:id', authMiddleware, receiptsController.show);
routes.put('/receipts/:id', authMiddleware, receiptsController.update);
routes.delete('/receipts/:id', authMiddleware, receiptsController.deleteReceipt);

routes.get('/archives', authMiddleware, archiveController.index);
routes.get('/archives/:id', authMiddleware, archiveController.show);
routes.post('/archives', authMiddleware, archiveController.create);
routes.put('/archives/:id', authMiddleware, archiveController.update);
routes.delete('/archives/:id', authMiddleware, archiveController.deleteArchive);

routes.get('/plantations', authMiddleware, plantationController.index);
routes.get('/plantations/:id', authMiddleware, plantationController.show);
routes.post('/plantations', authMiddleware, plantationController.create);
routes.put('/plantations/:id', authMiddleware, plantationController.update);
routes.delete('/plantations/:id', authMiddleware, plantationController.deletePlantation);

routes.get('/script', TrayController.index);
routes.get('/script2', TrayController.index2);
routes.post('/callback', TrayController.create);

export default routes;
