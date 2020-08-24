import { Request, Response, NextFunction } from 'express'

import { Filial, FilialService } from '.'
import HttpStatus from 'http-status'

class FilialMiddleware {

  validarFilial = async (req: Request, res: Response, next: NextFunction) => {
    this.validarSeFilialFoiInformada(req, res, next)
    this.validarSeFilialExiste(req, res, next)
  }

  private validarSeFilialFoiInformada = async (req: Request, res: Response, next: NextFunction) => {
    const filial: Filial = req.body

    if (!filial || !filial.codigo || !filial.razaoSocial) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: 'Filial não informada' })
    }

    next()
  }

  private validarSeFilialExiste = async (req: Request, res: Response, next: NextFunction) => {
    const filial: Filial = req.body

    const filialPesquisada = await FilialService.pesquisarPorCodigo(filial.codigo)

    if (!filialPesquisada) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: 'Filial não existe' })
    }

    next()
  }
}

export default new FilialMiddleware()