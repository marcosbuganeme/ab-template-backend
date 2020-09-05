import { Router } from 'express';

import DefaultRouter from './domain/default.router';
import FilialRoute from './domain/filiais/filial.router';
import ClienteRoute from './domain/clientes/cliente.router';

const Routes = Router();

Routes.use('/', DefaultRouter)
  .use('/filiais', FilialRoute)
  .use('/clientes', ClienteRoute);

export default Routes;
