import { Request, Response } from 'express';

import { ClienteService } from '.'

class ClienteController {

  async obterClientesExportados(req: Request, res: Response) {
    try {

      const { status, message, result } = await ClienteService.obterClientesExportados()

      return res
        .status(status)
        .send({ message, result })

    } catch (error) {
      return res
        .status(500)
        .send({
          error,
          message: 'Falha no processo de exportação de dados da PCCLIENT'
        });
    }
  }

  async exportarDados(req: Request, res: Response) {
    try {

      await ClienteService.exportarDados()

      return res
        .status(200)
        .send({ message: 'Dados da tabela PCCLIENT exportados.' })

    } catch (error) {
      return res
        .status(500)
        .send({
          error,
          message: 'Falha no processo de exportação de dados da PCCLIENT'
        });
    }
  }

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
