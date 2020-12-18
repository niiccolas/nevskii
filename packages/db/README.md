# Nevskii DB

<p align="center">
  <img width="600" src="./assets/svg/seed.svg">
</p>
Starter PostgreSQL database of 8182 movie items for the Nevskii platform.

Seed & dump locally with **Docker**, then deploy to **Heroku**!

## Setup

Clone repo and install dependencies. Install Docker.

At the project root, create a `.env` file with relevant credentials.

```bash
PG_PASS=abcd
PG_USER=postgres
PG_DB_NAME=nevskii
PG_HOST=localhost
PG_PORT=5432
```

Pull Docker's official [PostgreSQL image](https://hub.docker.com/_/postgres) and run an instance in a new container.

```bash
# Get Docker image
docker pull postgres

# Create new container...
docker run --name pgDocker -env POSTGRES_PASSWORD=abcd -d -p 5432:5432 postgres
# docker run --name {container_name} -env POSTGRES_PASSWORD={pg_pass} -d -p {host_port}:{container_port} {pg_username}
# -env  set environment variable(s)
# -d    run as daemon
# -p    expose port

# ...or start if already created!
docker start pgDocker
```

## Deployment

Run `yarn seed` using the following flags:

- `--deploy` or `-d`: deploy to heroku
- `--mint` or `-m`: use no missing data sourcefile
- `--items` or `-i`: **takes a number**, number of items to take from CSV sourcefile (defaults to 400)
- `--orders` or `-o`: **takes a number**, number of mock orders to generate in Orders table (defaults to 500)

Example command: `yarn seed --items 50 --orders 500 --mint --deploy`

## Heroku

For deployment to Heroku's [PostgreSQL free tier](https://elements.heroku.com/addons/heroku-postgresql), take into account the 10,000 total SQL rows limit (as of Oct. 2020). **Processing all items from CSV source files will exceed that limit!** Use the table below for reference and set [source file](https://github.com/niiccolas/nevskii-db/blob/b17d3dac9f8e8c2cd05934516766a0428953b4b3/src/index.js#L44) and [items range](https://github.com/niiccolas/nevskii-db/blob/b17d3dac9f8e8c2cd05934516766a0428953b4b3/src/index.js#L43) to limit row count accordingly.

| source file                                    | items range (first-last) | total SQL rows |
| ---------------------------------------------- | ------------------------ | -------------- |
| `dvd_8182.csv`                                 | 0-8182                   | 164477         |
|                                                | **0-200**                | **5486 ✅**    |
| `dvd_8182_mint.csv` (default, no missing data) | 0-4412 (default)         | 100785         |
|                                                | **0-400**                | **8860 ✅**    |
