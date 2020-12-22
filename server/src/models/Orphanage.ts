//  Esse modul vai criar a relação do nosse server com uma tabela do db, nesse caso vai ser com a tabela 'orphanages'
import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from 'typeorm'
import Image from './Image'

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

  @Column()
  accepted: boolean;

  // * Relacionamento
  // como não é um campo que existe no banco de dados não vamos colocar o @Column nele
  /*
    OneToMany() 1-n, um orfanato para varias imagens 
    o primeiro parametro é uma função que retornar qual o tipo do retorno 
    o segundo parametro é = dado uma imagem que recebeu, qual o campo dessa imagem que retorna o relacionamento inverso, ou seja, o orfanato em si. 
  */
  @OneToMany( () => Image, image => image.orphanage, {
    cascade: ['insert', 'update', 'remove'] // cascade = fazer algo automaticament, sempre que a gnt criar um orfanato ou alterar o cascade vai automaticamente realizar as alterações nas imagens relacionadas com ele
  })
  @JoinColumn({ name: 'orphanage_id'}) // nome da coluna que vai armazena o relacionamento do orfanato com a imagem
  images: Image[]; // Image[] porque pode ter varias imagens então é um array
}