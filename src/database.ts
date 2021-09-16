import { Connection, ConnectionOptions, createConnection } from 'typeorm';

export async function getDatabaseConnection(): Promise<Connection> {
  const options: ConnectionOptions = {
    name: 'default',
    type: 'sqlite',
    database: process.env.DB_PATH || '',
    logger: 'advanced-console',
  }

  return await createConnection(options);
}
