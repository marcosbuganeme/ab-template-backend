import { Router } from 'express'

import DefaultRouter from './domain/default.router'
import FilialRoute from './domain/filiais/filial.router'

const Routes = Router()

Routes
  .use('/', DefaultRouter)
  .use('/filiais', FilialRoute)

export default Routes