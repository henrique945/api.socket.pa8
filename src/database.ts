import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import { TempEntity } from './entities/temp.entity';
import { UserEntity } from './entities/user.entity';

export async function getDatabaseConnection(): Promise<Connection> {
  const options: ConnectionOptions = {
    name: 'default',
    type: 'sqlite',
    database: process.env.DB_PATH || '',
    logger: 'advanced-console',
    entities: [
      TempEntity,
      UserEntity,
    ],
    synchronize: true,
  };

  return await createConnection(options);
}
