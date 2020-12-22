import {Router} from 'express'
import multer from 'multer'
import uploadConfig from './config/upload'
import 'express-async-errors' // mostrar errors em funções assincronas
import 'dotenv/config'

import OrphangesController from './controllers/OrphanagesControllers'
import UsersController from './controllers/UsersControllers'

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages/:accepted', OrphangesController.index)
routes.get('/orphanage/:id', OrphangesController.show)
routes.delete('/orphanage/:id', OrphangesController.delete)
routes.post('/orphanages/accept-response/:id', OrphangesController.acceptOrphanageResponse)
// upload.array(<nome do campo que vai receber as imagens>) = receber varias imagens ao mesmo tempo
routes.post('/orphanages', upload.array('images'), OrphangesController.create)
routes.put('/orphanage/:id', upload.array('images'), OrphangesController.update)

routes.get('/user/:id', UsersController.getUserData)
routes.post('/register', UsersController.create)
routes.post('/login', UsersController.login)
routes.post('/forget-password', UsersController.forgetPassword)
routes.post('/reset-password', UsersController.resetPassword)

export default routes
