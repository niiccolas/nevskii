import { ConnectionOptions } from 'typeorm';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const isCompiled = path.extname(__filename).includes('js');

export default {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.DB_SYNC === 'true',
  logging:
    process.env.NODE_ENV === 'development' && process.env.DB_LOGS === 'true',
  autoReconnect: true,
  reconnectTries: 15,
  reconnectInterval: 2000,
  entities: [isCompiled ? 'dist/entities/**/*.js' : 'src/entities/**/*.ts'],
  migrations: [isCompiled ? 'dist/migration/**/*.js' : 'src/migration/**/*.ts'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migration',
  },
} as ConnectionOptions;
