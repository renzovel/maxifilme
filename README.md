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

## Rotas (Documentação)

| URL                      |     Parametros   |  Tipo de conteudo | Tipo         | Descricao |
| ------------------------ | ------------- | ------------- | ------------ | ------ |
| http://localhost:3001/api/usuario/login  | `{"email":"admin@maxifilme.com","senha":"admin12345"}` | application/json | POST |  Faça o login como administrador e receba o token de acesso (access-token)   |
| http://localhost:3001/api/usuario/cadastrar | `headers - access-token` `{"nome":"meunome","email":"email@maxifilme.com","senha":"senha8digitos"}` | application/json | POST | Registre usuários, apenas o administrador pode registrar |
|  http://localhost:3001/api/usuario/all |  `headers - access-token`   |  application/json | POST | Mostrar todos os usuários registrados |
| http://localhost:3001/api/usuario/apagar | `headers - access-token` `{"email":"usuario@maxifilme.com"}` | application/json | DELETE | Apaga o registro de um usuário |
| http://localhost:3001/api/filme/cadastrar | `headers - access-token` `- nome ` `- descricao ` `- diretor ` `- atores : '["",""]' (String) ` `- generos : '[1,2]' (String([id] Number, [id] Number)) ` `- image : (File)` |  multipart/form-data | POST | Registre os filmes |
| http://localhost:3001/api/filme/all/[:strPesquisa] http://localhost:3001/api/filme/all http://localhost:3001/api/filme/all/[:id] | `:strPesquisa` | application/json | GET | Verifique todos os filmes registrados apenas com um texto de pesquisa |
| http://localhost:3001/api/filme/diretor/[:nomeDiretor]  | `:nomeDiretor` | application/json  | GET |   Filtrar filmes pelo nome do diretor     |
| http://localhost:3001/api/filme/atores | `["nome1","nome2","nome...N"]` | application/json |  GET | Filtre o filme por um ou mais nomes de atores |
| http://localhost:3001/api/filme/generos | `["nome1","nome2","nome...N"]` | application/json  | GET | Filtrar filmes por nome de gêneros  |
| http://localhost:3001/api/filme/apagar |  `headers - access-token`  `{"id":1}` | application/json | DELETE | Excluir filmes registrados por id |


### Exemplos de cadastro para `http://localhost:3001/api/filme/cadastrar`

> Registrando filmes no APIRest :

![Access-Token](API/Exemplos/Capture1.png?v=1)

![Formulario de cadastro](API/Exemplos/Capture2.png?v=1)