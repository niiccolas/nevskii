# NevskiiAPI

Models are generated using `typeorm-model-generator`. See config file `.tomg-config` for details.

To keep models up to date after DB changes, run `npx typeorm-model-generator`.

## Setting up REDIS cache

`sudo docker run -d --name redis-nevskii -p 6379:6379 redis`

When hitting the `/register` and `/login` routes, the username:refresh-token key value pair is persisted within the REDIS cache.
