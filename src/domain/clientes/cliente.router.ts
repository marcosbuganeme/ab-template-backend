import { Router } from 'express';

import ClienteController from './cliente.controller';

const ClienteRouter = Router();

ClienteRouter
  .route('/')
  .get(ClienteController.pesquisarCliente)

ClienteRouter
  .route('/exportar-dados')
  .get(ClienteController.exportarDados)

ClienteRouter
  .route('/obter-clientes-exportados')
  .get(ClienteController.obterClientesExportados)

export default ClienteRouter;
