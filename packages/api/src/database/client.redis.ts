import redis from 'redis';
import chalk from 'chalk';

const client = redis.createClient({
  port: 6379,
  host: '127.0.0.1',
});

client.on('ready', () => {
  console.log(
    chalk.blueBright('🗂  Client connected to redis, ready to use...'),
  );
});

client.on('end', () => {
  console.log('Client disconnected from redis');
});

client.on('error', err => {
  console.log(err);
});

process.on('SIGINT', () => {
  client.quit();
});

export default client;
