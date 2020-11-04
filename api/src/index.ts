import express, { Response, Application, NextFunction } from 'express';
import cors from 'cors';
import chalk from 'chalk';
import morgan from 'morgan';
import { tryConnectDB } from './database';
import routes from './routes/index.routes';

const PORT: string | 8080 = process.env.PORT || 8080;
export const app: Application = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(
  async (_, res: Response, next: NextFunction) =>
    await tryConnectDB(
      () => res.json({ error: 'Database connection error' }),
      next,
    ),
);

// Routes
app.use(routes);

// Start server
app
  .listen(PORT, () => {
    console.log(chalk.magentaBright(`🍿 NevskiiAPI live on port ${PORT}`));
  })
  .on('error', (err: any) => {
    err.code === 'EADDRINUSE'
      ? console.log(chalk.redBright(`ERROR: port ${PORT} already in use`))
      : console.log(err);
  });
