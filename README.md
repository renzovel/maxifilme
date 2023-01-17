# maxifilme

Sistemas de filmes online, inclui registro de filmes.

## Requerimentos mínimos

- node v16.19.0
- npm 8.19.3
- Docker compose

## Iniciar no Docker compose (recomendado)

- `docker-compose up`


## Iniciar em node
### Enta na pasta /API

- 1 `npm install`
- 2 `npx sequelize-cli db:migrate`
- 3 `npx sequelize-cli db:seed:all`
- 4 `npm start`

### Enta na pasta /web

- 1 `npm install`
- 2 `npm start`

