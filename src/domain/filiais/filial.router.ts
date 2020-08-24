import { Router } from 'express'

import FilialMiddleware from './filial.middleware'
import FilialController from './filial.controller'

const FilialRouter = Router()

FilialRouter
  .route('/:codigo')
  .get(FilialController.pesquisarPorCodigo)

FilialRouter
  .route('/')
  .get(FilialController.pesquisarTodas)
  .post(FilialMiddleware.validarFilial, FilialController.criar)

export default FilialRouter