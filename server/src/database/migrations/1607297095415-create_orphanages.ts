/* Comando para criar a migration 
  >yarn typeorm migration:create -n create_orphanages
*/
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanages1607297095415 implements MigrationInterface {

  // O método up vai realizar as alterações no banco de dados
  // exemplo: criar tabela, criar campo, deletar campo, atualizar...
  public async up(queryRunner: QueryRunner): Promise<void> {
    
    // o queryRunner é a função que vai possuar os comandos dentro do banco de dados,
    await queryRunner.createTable(new Table({
      name: 'orphanages', // nome da tabela
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true, //somente numeros positivos
          isPrimary: true, //chave primaria
          isGenerated: true,
          generationStrategy: 'increment' //cada registro novo vai aumentar o id ex: 1, 2, 3...
        },
        {
          name: 'name',
          type: 'varchar'
        },
        {
          name: 'latitude',
          type: 'decimal',
          scale: 10, //numeros depois da virgula
          precision: 2 // numeros antes da virgula
        },
        {
          name: 'longitude',
          type: 'decimal',
          scale: 10, //numeros depois da virgula
          precision: 2 // numeros antes da virgula
        },
        {
          name: "about",
          type: 'text'
        },
        {
          name: "instructions",
          type: 'text'
        },
        {
          name: "opening_hours",
          type: 'varchar'
        },
        {
          name: "open_on_weekends",
          type: 'boolean',
          default: false
        }
      ]
    }))
      
  }

  // desfazer o que fez no metodo up
  // >yarn typeorm migration:revert  <- comando para desfazer essa tabela
  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('delete')
    // se no metodo up nós criamos uma tabela, no metodo down nos vamos deletar
    await queryRunner.dropTable('orphanages')
  }

}
