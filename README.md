# Desafio E-commerce Ioasys

## Configuração

### Usando Docker

    - Após clonar o repositório em algum diretório em seu computador, abre um terminal e vá até a pasta em que se encontra o repositório.
    - Renomei o arquivo .env.example para .env e coloque as váriaveis de ambiente de acordo com sua preferência.
    - Execute o comando docker-compose up para montar os containers, rodar as migrations, a seed e a aplicação.
    - Caso de algum erro, tente rodar a aplicação localmente, por favor.

### Usando localmente

    - Após clonar o repositório em algum diretório em seu computador, abre um terminal e vá até a pasta em que se encontra o repositório.
    - No terminal rode o comando para instalar as dependencias:
        - yarn
    - Renomei o arquivo .env.example para .env e coloque as váriaveis de ambiente de acordo com sua preferência.
    - Altere o campo "host" no arquivo ormconfig.json para "localhost"
    - No terminal rode os comandos:
        - Para criar o banco de dados: yarn seed:database
        - Para criar as tabelas: yarn migration: run
        - Para criar o usuario admin: yarn seed:admin
        - Para rodar a aplicação: yarn start:dev ou yarn start

## Considerações e Observações

    - As rotas relacionadas a Product, Supplier, Stock, Category, Shipment requerem Token de Administrador.

    - As rotas que requerem por algum motivo o ID do usuario, pegam o ID do usuario através do Token informado.

    - Os dados de administrador podem ser alterados no arquivo e caso queira adicionar mais de um, basta copia a query do INSERT e executar mais uma ou editar a já existente: final-challenge/src/infra/typeorm/seeds/create-admin.ts

    - Fiz alguns testes unitários para praticar, basta digitar o comando yarn test para executa-los

    - O diagrama e endpoints no Postman se encontram na raiz do projeto.

    - É feita uma validação no stock quando é realizada um Order, mas não consegui que o Throw caisse no catch do controller, então por enquanto está quebrando a aplicação.

    - Para validar se o usuario está logado, estou verificando além do token ser válido, se é ele que consta na tabela do usuario, para garantir que no signout, seja esquecido o token removido.

## Realizações futuras

    - Pretendo ampliar o test coverage e incluir testes de integração.

    - A algumas validações/implementações que gostaria de acrescentar, como: Remover do stock a quantidade requisitada na order, uma opção para resetar a senha, implementação de Redis para armazenar os Tokens com um blacklist para o que ainda estão válidos pelo JWT, mas não são mais autorizados a utilizar.

### Em caso de dúvidas ou problemas, estou a disposição no e-mail thiagosgdev@gmail.com
