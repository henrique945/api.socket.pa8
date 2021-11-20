import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('metric')
export class MetricEntity {

  //#region Constructors

  constructor(partial: Partial<MetricEntity>) {
    Object.assign(this, partial);
  }

  //#endregion

  /**
   * O id do usuário
   */
  @PrimaryGeneratedColumn()
  public id: number;

  /**
   * A umidade do ar
   */
  @Column({ type: 'float', nullable: false })
  public humidity: number;

  /**
   * A temperatura do ambiente
   */
  @Column({ type: 'float', nullable: false })
  public temperature: number;

  /**
   * A data de quando foi criado a métrica
   */
  @CreateDateColumn()
  @Index('idx_metric_created_at')
  public createdAt: Date;

}
