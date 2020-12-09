# Inicio
    Instalar o express para e colocar ele para rodar em uma porta

# Config
    instalar o typescript como dependencia de desenvolvimento
        >yarn add typescript -D
    e depois de instalado...
        >tsc --init
    tsc é um diminuitivo para o typescript, esse comando vai criar o arquivo de configurações do typescript.
    nesse arquivo vamos apenas alterar o target para o es2017

    Criar um script no package.json para rodar a aplicação
    "scripts": {
        "dev": "ts-node-dev --transpile-only --ignore-watch node_modules
    }

    --transpile-only: ignorar verificação de erro no codigo pois o edito já faz isso
    --ignore-watch node_modules: ignorar a pasta node_modules, vai fazer o restart ficar mais rapido

# Typeorm
    ORM = object relation mapper
    Vai gerar uma conexão direta com o banco de dados,
    Exemplo,
    Para a tabela users vai ter uma classe chamada User que vai ter os colunas e atributos que o user teria
    se fizermos um select de 3 users esse select vai nos retornar 3 instância da classe User
    User User User

## ormconfig.json
    Criar esse arquivo para manter todas as informações do banco de dados

    {
    "type": "sqlite",  # Qual o banco de dados está sendo utilizado
    "database": "./src/database/database.sqlite", # caminho para o database
    "migrations": [ 
        "./src/database/migrations/*.ts" # Pasta onde vai ficar localizado os arquivos de migrations, nesse caso, todos os arquivos que terminam com .ts dentro da pasta migrations são arquivos de migrations
    ],
    "entities": [
        "./src/models/*.ts" # localização das entities da aplicação
    ],
    "cli": {
        "migrationsDir": "./src/database/migrations" # Diretorio onde o orm deve criar os arquivos de migrations
    }
    }    

## ORM + TypeScript
    Por padrão o Typeorm roda com o javascript, então, precisamos falar para ele que vamos utilizar o typescript:
    no nosso package.json vamos criar um script para rodar o orm:
    
    "typeorm": "ts-node-dev ./node/modules/typeorm/cli.js"

    atraves do ts-node-dev ele vai buscar a cli.js dentro de onde o typeorm está instalado.

## Criando / Deletando migrations
    >yarn typeorm migration:create -n create_orphanages

    -n: nome da migration

    Vai criar um arquivo para a gnt (não devemos alterar esse nome) com os metodos up e down

    Para realizar o metodo up vamos utilizar o: 
    >yarn typeorm migration:run 

    E Para desfazer a tabela vamos usar este comando para desfazer as criações/alteraçoes:
        >yarn typeorm migration:revert

## tsconfig.json
    "strictPropertyInitialization": false // Descomentar este comando para poder definir o nome das variaveis dentro de uma classe sem mostrar erros 
    "experimentalDecorators": true,      // habilitar a API '@'
    "emitDecoratorMetadata": true,       

## Arquitetura MVC

    M - Model, representa um entidade da aplicação, fazendo a relação com o DB por exemplo (dado, orfanato, usuario, etc)
    V - View, como as coisas são visualizadas/disponiveis para o frontend
    C - Controllers, logica das rotas
