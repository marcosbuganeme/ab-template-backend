import OracleDB from 'oracledb'

import { Oracle } from '../../infra'
import { Util, UtilOracle } from '../../components'

import { Filial, FilialSql, FilialSchema } from './'

class FilialService {

  criarFilialNoMongo = async (filial: Filial) => {
    return await FilialSchema
      .create(filial)
      .then(filialCriada => Util.cadastro(filialCriada, `filial ${filial.codigo} criada no mongo`))
      .catch(error => Util.erro(error))
  }

  todasFiliais = async () => {
    let connection: OracleDB.Connection = null
    return await Oracle
      .conectar()
      .then(poolConexaoOracle => connection = poolConexaoOracle)
      .then(() => UtilOracle.query(connection, FilialSql.todas()))
      .then(resultadosDoSql => this.converterDadosSqlParaModelo(resultadosDoSql))
      .then(filiais => UtilOracle.finalize(connection, filiais))
      .catch(error => Util.erro(error))
  }

  pesquisarPorCodigo = async (codigo: string) => {
    let connection: OracleDB.Connection = null
    return await Oracle
      .conectar()
      .then(poolConexaoOracle => connection = poolConexaoOracle)
      .then(() => UtilOracle.query(connection, FilialSql.porCodigo(codigo)))
      .then(resultadosDoSql => this.converterDadosSqlParaModelo(resultadosDoSql))
      .then(filiais => UtilOracle.finalize(connection, filiais))
      .catch(error => Util.erro(error))
  }

  private async converterDadosSqlParaModelo(result: OracleDB.Result<unknown>): Promise<Array<Filial>> {
    return result.rows.map(coluna => this.transformarResultado(coluna))
  }

  private transformarResultado = (columns: any): Filial => {
    const { CODIGO, RAZAOSOCIAL } = columns
    return { codigo: CODIGO, razaoSocial: RAZAOSOCIAL }
  }
}

export default new FilialService()