import { Request, Response } from 'express';

import { Filial, FilialService } from '.';

class FilialController {
  async criar(req: Request, res: Response) {
    try {
      const filial: Filial = req.body;
      const {
        status,
        message,
        result,
      } = await FilialService.criarFilialNoMongo(filial);
      return res.status(status).send({ message, result });
    } catch (error) {
      return res.status(error.status).send({ error: error.message });
    }
  }

  async pesquisarPorCodigo(req: Request, res: Response) {
    try {
      const { codigo } = req.params;
      const {
        status,
        message,
        result,
      } = await FilialService.pesquisarPorCodigo(codigo);
      return res.status(status).send({ message, result });
    } catch (error) {
      return res.status(error.status).send({ error: error.message });
    }
  }

  async pesquisarTodas(req: Request, res: Response) {
    try {
      const { status, message, result } = await FilialService.todasFiliais();
      return res.status(status).send({ message, result });
    } catch (error) {
      return res.status(error.status).send({ message: error.message });
    }
  }
}

export default new FilialController();
