// TS file allows dealing with multiple environments in a single file
import { ConnectionOptions } from 'typeorm';
import path from 'path';
require('dotenv').config();

const isCompiled = path.extname(__filename).includes('js');

export default {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: !process.env.DB_NO_SYNC,
  logging: !process.env.DB_NO_LOGS,
  autoReconnect: true,
  reconnectTries: 15,
  reconnectInterval: 2000,
  entities: [`src/entities/**/*.${isCompiled ? 'js' : 'ts'}`],
  migrations: [`src/migration/**/*.${isCompiled ? 'js' : 'ts'}`],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
  },
} as ConnectionOptions;
