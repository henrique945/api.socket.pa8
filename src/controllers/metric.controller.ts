// #region Imports

import express from 'express';
import { Repository } from 'typeorm';
import { MetricEntity } from './../entities/metric.entity';

// #endregion

/**
 * A classe que representa o controller para as rotas das métricas
 */
export class MetricController {
  // #region Constructors

  /**
   * Construtor padrão
   */
  constructor(private readonly repository: Repository<MetricEntity>) {}

  // #endregion

  // #region Public Methods

  /**
   * Método que retorna as rotas que lidam com as métricas
   */
  public getRoutes(): express.Router {
    const router = express.Router();

    router.get('/metric/latest', this.getLatestMetric.bind(this));
    router.get('/metric', this.getAllMetrics.bind(this));
    router.post('/metric', this.createMetric.bind(this));

    return router;
  }

  // #endregion

  // #region Private Methods

  /**
   * Método que retorna a última métrica registrada
   */
  private async getLatestMetric(req, res): Promise<void> {
    const latestMetric = await this.repository.findOne({
      order: {
        createdAt: 'DESC',
      },
    });

    if (!latestMetric) return res.status(404).json({ message: 'Não foi cadastrado nenhuma métrica ainda.' });

    res.json(latestMetric);
  }

  /**
   * Método que lista todas as métricas
   */
  private async getAllMetrics(req, res): Promise<void> {
    const metrics = await this.repository.find({
      take: 100,
      order: {
        createdAt: 'DESC',
      },
    });

    res.json(metrics);
  }

  /**
   * Método que atualiza um usuário
   */
  private async createMetric(req, res): Promise<void> {
    const { humidity, temperature } = req.body;

    if (!humidity || isNaN(Number(humidity))) return res.status(400).json({ message: 'É necessário enviar a umidade como um número válido.' });

    if (!temperature || isNaN(Number(temperature))) return res.status(400).json({ message: 'É necessário enviar a temperatura como um número válido.' });

    const entity = await this.repository.save(
      new MetricEntity({
        humidity,
        temperature,
      })
    );

    res.json(entity);
  }

  // #endregion
}
