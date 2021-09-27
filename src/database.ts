import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import { UserEntity } from './entities/user.entity';

export async function getDatabaseConnection(): Promise<Connection> {
  const options: ConnectionOptions = {
    name: 'default',
    type: 'sqlite',
    database: process.env.DB_PATH || '',
    logger: 'advanced-console',
    entities: [
      UserEntity,
    ],
    synchronize: true,
  };

  return await createConnection(options);
}
