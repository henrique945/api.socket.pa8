import { getDatabaseConnection } from './database';

require('dotenv').config();
const express = require('express');
const app = express();

const createApp = async () => {
  const db = await getDatabaseConnection();

  app.get('/', (req, res) => {
    res.send('<h1>PA8</h1>');
  });

  app.get('/temp', (req, res) => {
    console.log(req.params);
    res.json({ temperature: 10 });
  });

  app.listen(process.env.PORT, () => {
    console.log('listening on -> 3000');
  });
};

createApp();
