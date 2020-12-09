import {Request, Response} from 'express'
import {getRepository} from 'typeorm' // getRepository = vai determinar todas as operações que formos fazer no DB, criar, deletar, listar, etc. o Repositorio vai deter todas essas regras
import Orphanage from '../models/Orphanage'

export default {

    async index(request: Request, response: Response) {
        const orphanagesRepository = getRepository(Orphanage)

        // pegar todos orfanatos sem parametros no find para pegar todos
        const orphanages = await orphanagesRepository.find();

        return response.json(orphanages)
    },

    async show(request: Request, response: Response) {
        const {id} = request.params
        const orphanagesRepository = getRepository(Orphanage)

        // pegar um orfanato, vai retornar ele ou um erro
        const orphanage = await orphanagesRepository.findOneOrFail(id);

        return response.json(orphanage)
    },

    async create(request: Request, response: Response) {
        const {name, latitude, longitude, about, instructions, opening_hours, open_on_weekends} = request.body
  
        try {
          const orphanagesRepository = getRepository(Orphanage)
      
          // .create apenas vai deixar pre-criado o repositorio, não vai salvar
          const orphanage = orphanagesRepository.create({
            name, latitude, longitude, about, instructions, opening_hours, open_on_weekends
          })
        
          await orphanagesRepository.save(orphanage);
        
          return response.status(200).json({message: "Orphanage created with success"})
        } catch (err) {
          return response.status(400).json({err})
        }
    }
}