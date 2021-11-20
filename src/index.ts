import { MetricController } from './controllers/metric.controller';
import { MetricEntity } from './entities/metric.entity';
import { UserController } from './controllers/user.controller';
import { getDatabaseConnection } from './database';
import { UserEntity } from './entities/user.entity';

require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

const createApp = async () => {
  const db = await getDatabaseConnection();

  const userRepository = db.getRepository(UserEntity);
  const userController = new UserController(userRepository);

  const metricRepository = db.getRepository(MetricEntity);
  const metricController = new MetricController(metricRepository);

  app.get('/', (req, res) => {
    res.send('<h1>PA8</h1>');
  });

  app.use(userController.getRoutes());
  app.use(metricController.getRoutes());

  app.listen(process.env.PORT, () => {
    console.log('listening on -> 3000');
  });
};

createApp();
