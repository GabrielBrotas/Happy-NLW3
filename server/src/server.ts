import express from 'express'
import bodyParser from 'body-parser'
import './database/connection'
import {getRepository} from 'typeorm' // getRepository = vai determinar todas as operações que formos fazer no DB, criar, deletar, listar, etc. o Repositorio vai deter todas essas regras
import Orphanage from './models/Orphanage'

const app = express();
app.use(bodyParser.json());

app.post('/orphanages', async (req, res) => {
  const {name, latitude, longitude, about, instructions, opening_hours, open_on_weekends} = req.body

  try {
    const orphanagesRepository = getRepository(Orphanage)

    // .create apenas vai deixar pre-criado o repositorio, não vai salvar
    const orphanage = orphanagesRepository.create({
      name, latitude, longitude, about, instructions, opening_hours, open_on_weekends
    })
  
    await orphanagesRepository.save(orphanage);
  
    return res.status(200).json({message: "Orphanage created with success"})
  } catch (err) {
    return res.status(400).json({err})
  }
  
});

app.listen(8080, () => {
  console.log('server runing in port 8080')
}) 