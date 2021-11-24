import { MetricEntity } from './entities/metric.entity';
import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import { UserEntity } from './entities/user.entity';

export async function getDatabaseConnection(): Promise<Connection> {
  const options: ConnectionOptions = {
    name: 'default',
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    logger: 'advanced-console',
    synchronize: true,
    ssl: true,
    extra: {
      ssl: {
        "rejectUnauthorized": false
      }
    },
    entities: [
      UserEntity,
      MetricEntity,
    ],
  };

  return await createConnection(options);
}
