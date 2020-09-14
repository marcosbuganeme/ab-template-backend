import { Request, Response } from 'express';

import { ClienteService } from '.';

class ClienteController {
  async pesquisarCliente(req: Request, res: Response) {
    try {
      const { codigo, cliente } = req.query;
      const { status, message, result } = await ClienteService.pesquisarCliente(
        +codigo,
        cliente.toString()
      );
      return res.status(status).send({ message, result });
    } catch (error) {
      return res.status(error.status).send({ error: error.meessage });
    }
  }
}

export default new ClienteController();
