import {Request, Response} from 'express'
import {getRepository} from 'typeorm' // getRepository = vai determinar todas as operações que formos fazer no DB, criar, deletar, listar, etc. o Repositorio vai deter todas essas regras
import Orphanage from '../models/Orphanage'
import OrphanageView from '../views/orphanages_view'

export default {

  async index(request: Request, response: Response) {
      const orphanagesRepository = getRepository(Orphanage)

      // pegar todos orfanatos sem parametros no find para pegar todos
      const orphanages = await orphanagesRepository.find({
        relations: ['images'] // nome da coluna relacionada que tem as imagens
      });

      return response.json(OrphanageView.renderMany(orphanages))
  },

  async show(request: Request, response: Response) {
    const {id} = request.params
    const orphanagesRepository = getRepository(Orphanage)
    
    try {
      // pegar um orfanato, vai retornar ele ou um erro
      const orphanage = await orphanagesRepository.findOneOrFail(id, {
        relations: ['images']
      });

      return response.json(OrphanageView.render(orphanage))
    } catch (err) {
      return response.send('error = ' + err)
    }
      
  },

  async create(request: Request, response: Response) {
    const {name, latitude, longitude, about, instructions, opening_hours, open_on_weekends} = request.body

    // para entender que o request.files é um array de arquivos
    const requestImages = request.files as Express.Multer.File[];
    
    const images = requestImages.map( image => {
      return { 
          path: image.filename
      }
    })

    try {
      const orphanagesRepository = getRepository(Orphanage)
  
      // .create apenas vai deixar pre-criado o repositorio, não vai salvar
      const orphanage = orphanagesRepository.create({
        name, latitude, longitude, about, instructions, opening_hours, open_on_weekends, images
      })
    
      await orphanagesRepository.save(orphanage);
    
      return response.status(200).json( orphanage)
    } catch (err) {
      return response.status(400).json({err})
    }
  }
}