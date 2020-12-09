import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanages1607297095415 implements MigrationInterface {

  // realizar as alterações no banco de dados
  // criar tabela, criar campo, deletar campo, atualizar...
  public async up(queryRunner: QueryRunner): Promise<void> {
    // criar uma tabela
    await queryRunner.createTable(new Table({
      name: 'orphanages',
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
  public async down(queryRunner: QueryRunner): Promise<void> {
    // se no metodo up nós criamos uma tabela, no metodo down nos vamos deletar
    await queryRunner.dropTable('orphanages')
  }

}
