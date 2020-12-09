import {Router} from 'express'
import OrphangesController from './controllers/OrphanagesControllers'
const routes = Router()

routes.get('/orphanages', OrphangesController.index)
routes.get('/orphanages/:id', OrphangesController.show)
routes.post('/orphanages', OrphangesController.create);

export default routes