import { app } from './app';
import chalk from 'chalk';

const PORT = process.env.PORT || 8000;

app
  .listen(PORT, () => {
    console.log(chalk.magentaBright(`🍿 NevskiiAPI live on port ${PORT}`));
  })
  .on('error', err => {
    console.log(chalk.redBright(err));
  });
