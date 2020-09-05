import { Router } from 'express';

import ClienteController from './cliente.controller';

const ClienteRouter = Router();

ClienteRouter.route('/:codigo').get(ClienteController.pesquisarPorCodigo);

export default ClienteRouter;
