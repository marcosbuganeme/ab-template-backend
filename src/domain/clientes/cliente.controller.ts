import { Request, Response } from 'express';

import { Cliente, ClienteService } from '.';

class ClienteController {
  async pesquisarPorCodigo(req: Request, res: Response) {
    try {
      const { codigo, cliente } = req.params;
      const {
        status,
        message,
        result,
      } = await ClienteService.pesquisarPorCodigo(parseInt(codigo), cliente);
      return res.status(status).send({ message, result });
    } catch (error) {
      return res.status(error.status).send({ error: error.meessage });
    }
  }

  // async pesquisarTodas(req: Request, res: Response) {
  //   try {
  //     const {status, message, result } = await ClienteService.
  //   }
  // }
}

export default new ClienteController();
