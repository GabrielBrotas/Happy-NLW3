import {Router} from 'express'
import multer from 'multer'
import 'express-async-errors' // mostrar errors em funções assincronas
import uploadConfig from './config/upload'

import OrphangesController from './controllers/OrphanagesControllers'
import UsersController from './controllers/UsersControllers'

const routes = Router()
const upload = multer(uploadConfig)

routes.get('/orphanages', OrphangesController.index)
routes.get('/orphanages/:id', OrphangesController.show)
routes.post('/users', UsersController.create)

// upload.array(<nome do campo que vai receber as imagens>) = receber varias imagens ao mesmo tempo
routes.post('/orphanages', upload.array('images'), OrphangesController.create);

export default routes
