import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {

  //#region Constructors

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  //#endregion

  /**
   * O id do usuário
   */
  @PrimaryGeneratedColumn()
  public id: number;

  /**
   * O nome do usuário
   */
  @Column({ nullable: false })
  public name?: string;

  /**
   * O email do usuário
   */
  @Column({ nullable: false })
  public email: string;

  /**
   * A senha do usuário
   */
  @Column({ nullable: false, select: false })
  public password: string;

  /**
   * O código para quando o usuário esquecer a senha
   */
  @Column({ nullable: false })
  public forgetPasswordCode: string;

  /**
   * As permissões do usuário
   */
  @Column({ nullable: false, default: 'user' })
  public roles: string;

}
