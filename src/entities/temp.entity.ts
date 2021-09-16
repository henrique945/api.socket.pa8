import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('temp')
export class TempEntity {

  //#region Constructors

  constructor(partial: Partial<TempEntity>) {
    Object.assign(this, partial);
  }

  //#endregion

  //#region Public Properties

  /**
   * O id da temperatura
   */
  @PrimaryGeneratedColumn()
  public id: number;

  /**
   * A temperatura média
   */
  @Column({ nullable: false })
  public avg: number;

  @Column({ nullable: true })
  public name: string;

  //#endregion

}
