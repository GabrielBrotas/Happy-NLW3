import {Request, Response} from 'express'
import fs from 'fs'
import path from 'path'
import {promisify} from 'util'
import * as Yup from 'yup' // o yup é uma biblioteca de validação de dados, como ele não tem um export default vamos fazer uma importação de tudo usando o *
import {getRepository} from 'typeorm' // getRepository = vai determinar todas as operações que formos fazer no DB, criar, deletar, listar, etc. o Repositorio vai deter todas essas regras
import Orphanage from '../models/Orphanage'
import Image from '../models/Image'

import OrphanageView from '../views/orphanages_view'

interface orphanageProps {
  name: string, 
  latitude: number, 
  longitude: number, 
  about: string, 
  instructions: string, 
  opening_hours: string, 
  open_on_weekends: boolean; //converter para boolean 
  images?: Array<{}>,
  accepted: boolean

}

async function validateOrphanageData(data: orphanageProps) { 
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
    ),
    accepted: Yup.boolean().required()
  })

  // validação
  await schema.validate(data, {
    abortEarly: false // se ele encontrar um campo que não estiver valido ele imediatamente vai abortar, vamos deixar falso pois queremos a mensagem de todos os campos que não estiverem validos, retornar todos os erros ao mesmo tempo.
  })

}

export default {

  async index(request: Request, response: Response) {
    const {accepted} = request.params

      const orphanagesRepository = getRepository(Orphanage)

      // pegar todos orfanatos sem parametroys no find para pegar todos
      const orphanages = await orphanagesRepository.find({
        where: {accepted: accepted === "true"},
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
      images,
      accepted: false
    }

    await validateOrphanageData(data)

    // .create apenas vai deixar pre-criado o repositorio, não vai salvar
    const orphanage = orphanagesRepository.create(data)
  
    await orphanagesRepository.save(orphanage);
  
    return response.status(200).json( orphanage)
  },

  async update(request: Request, response: Response) {
    const {name, latitude, longitude, about, instructions, opening_hours, open_on_weekends} = request.body
    const {id} = request.params

    const orphanagesRepository = getRepository(Orphanage)
    // const imagesRepository = getRepository(Image)

    const data = {
      name, 
      latitude, 
      longitude, 
      about, 
      instructions, 
      opening_hours, 
      open_on_weekends: open_on_weekends === "true", //converter para boolean 
      accepted: true 
    }

    await validateOrphanageData(data)

    // .create apenas vai deixar pre-criado o repositorio, não vai salvar
    const orphanage = await orphanagesRepository.findOne(id)
    
    // * update images
    // imagesRepository.find({orphanage}).then( async orphanageImages => {
    //   orphanageImages.map( image => {
    //     imagesRepository.delete(image.id)
    //     return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'uploads', image.path))
    //   })
      
    //   const requestImages = request.files as Express.Multer.File[];
      
    //   const images = requestImages.map( image => {
    //     return {
    //       path: image.filename,
    //       orphanage
    //     }
    //   })

    //   const image = imagesRepository.create(images)
    //   await imagesRepository.save(image)
    // })

    await orphanagesRepository.update(id, data)
    return response.status(200).send("orphanage updated successfully")
  },
  
  async delete(request: Request, response: Response) {
    const {id} = request.params
    const orphanagesRepository = getRepository(Orphanage)

    const orphanage = await orphanagesRepository.findOne(id, {
      relations: ['images']
    })

    if(!orphanage) return response.status(404).send('orphanage not found')

    orphanage.images.map( image => {
      return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'uploads', image.path))
    })

    await orphanagesRepository.delete(id)

    return response.status(200).send()
  
  },

  async acceptOrphanageResponse(req: Request, res: Response) {
    const {id} = req.params
    const {adminResponse} = req.body
    
    const orphanagesRepository = getRepository(Orphanage)

    const orphanage = await orphanagesRepository.findOne({id: parseInt(id)})

    if(!orphanage) { return res.status(404).send("orphanage not found") }

    if(adminResponse) {
      orphanage.accepted = true
      await orphanagesRepository.save(orphanage)
      return res.status(200).send("orphanage saved")
    } else {
      await orphanagesRepository.delete({id: parseInt(id)})
      return res.status(200).send("orphanage removed")
    }
    
  }
}