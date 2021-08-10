import { Sequelize } from 'sequelize';
import dbConfig from '../config/database';

import User from './models/Users';
import Companies from './models/Companies';
import Receipts from './models/Receipts';
import Archives from './models/Archives';
import Plantations from './models/Plantations';

const connection = new Sequelize(dbConfig);

User.init(connection);
Companies.init(connection);
Receipts.init(connection);
Archives.init(connection);
Plantations.init(connection);

export default connection;
