import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImages1607556893376 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'images',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'path', // caminho da imagem
                    type: 'varchar'
                },
                {
                    // relacionamento de 1 para muitos (1-n), 1 orfanato possui varias imagens e varias imagens só possui um orfanato
                    name: 'orphanage_id',
                    type: 'integer'
                }
            ],
            foreignKeys: [
                {
                    name: 'ImageOrphanage',
                    columnNames: ['orphanage_id'], // nome da coluna que vai possuir o relacionamento
                    referencedTableName: 'orphanages', // tabela com qual está se relacionando 
                    referencedColumnNames: ['id'], // dentro da tabela de orfanatos com qual coluna vai estar se relacionando
                    onUpdate: 'CASCADE', // caso o id do orfanato tenha sido atualizado ele vai alterar o id dele em todas as imagens que possuirem o relacionamento
                    onDelete: 'CASCADE' // caso o orfanato seja deleto as imagens também serão
                }
            ]
        }))

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        console.log('delete 2')
        await queryRunner.dropTable('images')
    }

}
