import { customAlphabet } from 'nanoid';
import { getDatabaseConnection } from './database';
import { TempEntity } from './entities/temp.entity';
import { UserEntity } from './entities/user.entity';

require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

const createApp = async () => {
  const db = await getDatabaseConnection();
  const userRepository = db.getRepository(UserEntity);

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

  app.get('/user', async (req, res) => {
    const users = await userRepository.find();
    res.json(users);
  });

  app.post('/user', async (req, res) => {
    const alreadyHasEmail = await userRepository.findOne({ where: { email: req.body.email } });

    if (alreadyHasEmail)
      return res.json({ error: 'Email já cadastrado.' });

    const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', 6);
    req.body.forgetPasswordCode = nanoid();

    const user = await userRepository.save(req.body);
    res.json(user);
  });

  app.delete('/user/:id', async (req, res) => {
    const user = await userRepository.findOne({ where: { id: req.params.id } });

    if (!user)
      return res.json({ error: 'Usuário não encontrado.' });

    const userDeleted = await userRepository.remove(user);

    res.json(userDeleted);
  });

  app.listen(process.env.PORT, () => {
    console.log('listening on -> 3000');
  });
};

createApp();
