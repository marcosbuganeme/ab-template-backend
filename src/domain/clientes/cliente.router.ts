import { Router } from 'express';

import ClienteController from './cliente.controller';

const ClienteRouter = Router();

ClienteRouter.route('/').get(ClienteController.pesquisarCliente);

export default ClienteRouter;
