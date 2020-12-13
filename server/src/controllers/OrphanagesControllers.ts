import {Request, Response} from 'express'
import * as Yup from 'yup' // o yup é uma biblioteca de validação de dados, como ele não tem um export default vamos fazer uma importação de tudo usando o *
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

    // pegar um orfanato, vai retornar ele ou um erro
    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images']
    });

    return response.json(OrphanageView.render(orphanage)) 
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
    
    const orphanagesRepository = getRepository(Orphanage)

    const data = {
      name, 
      latitude, 
      longitude, 
      about, 
      instructions, 
      opening_hours, 
      open_on_weekends: open_on_weekends === "true", //converter para boolean 
      images
    }

    // criando um schema/interface que nossos orfanatos deve ter
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
      })
      )
    })

    // validação
    await schema.validate(data, {
      abortEarly: false // se ele encontrar um campo que não estiver valido ele imediatamente vai abortar, vamos deixar falso pois queremos a mensagem de todos os campos que não estiverem validos, retornar todos os erros ao mesmo tempo.
    })

    // .create apenas vai deixar pre-criado o repositorio, não vai salvar
    const orphanage = orphanagesRepository.create(data)
  
    await orphanagesRepository.save(orphanage);
  
    return response.status(200).json( orphanage)
  }
}