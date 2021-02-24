import express, { Response, Application, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
dotenv.config();

import './database/client.redis';
import { tryConnectDB } from './database';
import routes from './routes/index.routes';

export const app: Application = express();
/* DATABASE */
app.use(
  async (_, res: Response, next: NextFunction) =>
    await tryConnectDB(
      () => res.json({ error: 'Database connection error' }),
      next,
    ),
);

/* MIDDLEWARE */
app.use(cors());
app.use(helmet());
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

/* MIDDLEWARE */
app.use(routes);
