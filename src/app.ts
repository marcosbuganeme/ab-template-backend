import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import bodyParser from 'body-parser'
import morgan from 'morgan'

import { Mongo, Oracle } from './infra'
import RotasApiTemplateBackend from './router'

class App {
  express: express.Application

  constructor() {
    this.inicializar()
  }

  inicializar() {
    this.express = express()
    this.express.use(cors())
    this.express.use(helmet())
    this.express.use(compression())
    this.express.use(bodyParser.json({ limit: '15mb' }))
    this.express.use(bodyParser.urlencoded({ limit: '15mb', extended: true }))
    this.express.use(morgan(':date[iso] HTTP/:http-version :method :url :status :response-time ms'))
    this.express.use(RotasApiTemplateBackend)
    this.conectarBancoDadosMongo()
    this.testarConectividadeBancoDadosOracle()
  }

  async conectarBancoDadosMongo() {
    await Mongo.conectar()
  }

  async testarConectividadeBancoDadosOracle() {
    await Oracle.testar()
  }
}

export default new App().express