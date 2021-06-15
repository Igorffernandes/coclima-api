import express from 'express';
import cors from 'cors';
import routes from './routes';
import sequelize from './database';

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use(routes);

app.listen(PORT, HOST, async () => {
  await sequelize.authenticate();
  console.log('🚀 API started');
});
