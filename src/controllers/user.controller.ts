// #region Imports

import express from 'express';
import { customAlphabet } from 'nanoid';
import { Repository } from 'typeorm';
import { UserEntity } from './../entities/user.entity';

// #endregion

/**
 * A classe que representa o controller para as rotas do usuário
 */
export class UserController {
  // #region Constructors

  /**
   * Construtor padrão
   */
  constructor(private readonly repository: Repository<UserEntity>) {}

  // #endregion

  // #region Public Methods

  /**
   * Método que retorna as rotas que lidam com o usuário
   */
  public getRoutes(): express.Router {
    const router = express.Router();

    router.get('/user', this.listUsers.bind(this));
    router.post('/user', this.createUser.bind(this));
    router.put('/user/:id', this.updateUser.bind(this));
    router.delete('/user/:id', this.deleteUser.bind(this));

    return router;
  }

  // #endregion

  // #region Private Methods

  /**
   * Método que lista todos os usuários
   */
  private async listUsers(req, res): Promise<void> {
    const users = await this.repository.find();

    res.json(users);
  }

  /**
   * Método que cria um novo usuário
   */
  private async createUser(req, res): Promise<void> {
    const alreadyHasEmail = await this.repository.findOne({ where: { email: req.body.email } });

    if (alreadyHasEmail) return res.json({ error: 'Email já cadastrado.' });

    const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', 6);
    req.body.forgetPasswordCode = nanoid();

    const user = await this.repository.save(req.body);
    res.json(user);
  }

  /**
   * Método que atualiza um usuário
   */
  private async updateUser(req, res): Promise<void> {
    const user = await this.repository.findOne({ where: { id: req.params.id } });

    if (!user) return res.json({ error: 'Usuário não encontrado.' });

    if (req.body.name) user.name = req.body.name;

    const userUpdated = await this.repository.save(user);
    res.json(userUpdated);
  }

  /**
   * Método que remove um usuário
   */
  private async deleteUser(req, res): Promise<void> {
    const user = await this.repository.findOne({ where: { id: req.params.id } });

    if (!user) return res.json({ error: 'Usuário não encontrado.' });

    await this.repository.remove(user);

    res.status(204).send();
  }

  // #endregion
}
