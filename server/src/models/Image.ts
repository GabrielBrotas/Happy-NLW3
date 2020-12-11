//  Esse modul vai criar a relação do nosse server com uma tabela do db, nesse caso vai ser com a tabela 'orphanages'
import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm'
import Orphanage from './Orphanage'

// Com o @Entity o typeorm vai entender que a classe criada está associada com a tabela chamada 'orphanages'
@Entity('images')
export default class Images {

  // Coluna primaria do banco de dados
  @PrimaryGeneratedColumn('increment')
  id: number;

  // indica uma coluna qualquer do db
  @Column()
  path: string;

  // * Relacionamento
  // como não é um campo que existe no banco de dados não vamos colocar o @Column nele
  /*
    ManyToOne() n-1, Varias imagens para um orfanato 
    o primeiro parametro é uma função que retornar qual o tipo do retorno 
    o segundo parametro é = dado um orfanato que recebeu, qual o campo desse orfanato que retorna o relacionamento inverso, ou seja, o orfanato em si. 
  */
  @ManyToOne( () => Orphanage, orphanage => orphanage.images)
  @JoinColumn({name: 'orphanage_id',})
  orphanage: Orphanage // vai ter apenas um orfanato
}