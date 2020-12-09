import { createConnection } from 'typeorm'

// criar conexão com o database, esse arquivo tem que ser importado no inicio (server.ts) para que realize a conexação com o banco de dados sempre que o servidor estiver rodando 
createConnection()