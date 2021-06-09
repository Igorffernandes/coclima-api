import { Sequelize } from 'sequelize';
import dbConfig from '../config/database';

import User from './models/Users';
import Client from './models/Clients';
import Receipts from './models/Receipts';

const connection = new Sequelize(dbConfig);

User.init(connection);
Client.init(connection);
Receipts.init(connection);

Receipts.associate(connection.models);

export default connection;
