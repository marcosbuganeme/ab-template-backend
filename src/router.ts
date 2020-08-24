import { Router } from 'express'

import DefaultRouter from './domain/default.router'
import PagamentoRoute from './domain/filiais/filial.router'

const Routes = Router()

Routes
  .use('/', DefaultRouter)
  .use('/pagamentos', PagamentoRoute)

export default Routes