import {Router} from 'express'
import multer from 'multer'

import uploadConfig from './config/upload'
import OrphangesController from './controllers/OrphanagesControllers'

const routes = Router()
const upload = multer(uploadConfig)

routes.get('/orphanages', OrphangesController.index)
routes.get('/orphanages/:id', OrphangesController.show)

// upload.array(<nome do campo que vai receber as imagens>) = receber varias imagens ao mesmo tempo
routes.post('/orphanages', upload.array('images'), OrphangesController.create);

export default routes
