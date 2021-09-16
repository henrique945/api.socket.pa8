import { getDatabaseConnection } from './database';
import { TempEntity } from './entities/temp.entity';

require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json())

const createApp = async () => {
  const db = await getDatabaseConnection();

  app.get('/', (req, res) => {
    res.send('<h1>PA8</h1>');
  });

  app.get('/temp', (req, res) => {
    console.log(req.params);
    res.json({ temperature: 10 });
  });

  app.post('/temp', async (req, res) => {
    console.log(req.body);

    const tempRepository = db.getRepository(TempEntity);
    const result = await tempRepository.save({ avg: 50, name: 'Henrique' });
    res.json(result);
  });

  app.listen(process.env.PORT, () => {
    console.log('listening on -> 3000');
  });
};

createApp();
