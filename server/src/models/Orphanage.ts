import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

// Com o @Entity o typeorm vai entender que a classe criada está associada com a tabela chamada 'orphanages'
@Entity('orphanages')
export default class Orphanage {
  
  // Coluna primaria do banco de dados
  @PrimaryGeneratedColumn('increment')
  id: number;

  // indica uma coluna qualqeur do db
  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  about: string;

  @Column()
  instructions: string;

  @Column()
  opening_hours: string;

  @Column()
  open_on_weekends: boolean;
}