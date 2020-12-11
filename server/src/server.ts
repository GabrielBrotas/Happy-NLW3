import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes'
import path from 'path'
import errorHandler from './errors/handler'

import 'express-async-errors' // mostrar errors em funções assincronas
import './database/connection'


const app = express();

app.use(bodyParser.json());
app.use(routes)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(errorHandler)

app.listen(8080, () => {
  console.log('server runing in port 8080')
}) 