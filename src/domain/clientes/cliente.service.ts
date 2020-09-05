import OracleDB from 'oracledb';

import { Oracle } from '../../infra';
import { Util, UtilOracle } from '../../components';

import { ClienteSql, Cliente } from './';

class ClienteService {
  pesquisarPorCodigo = async (codigo: number, nome: string) => {
    let connection: OracleDB.Connection = null;
    return await Oracle.conectar()
      .then((poolConexaoOracle) => (connection = poolConexaoOracle))
      .then(() =>
        UtilOracle.query(connection, ClienteSql.porFiltro(codigo, nome))
      )
      .then((resultadoDoSql) =>
        this.converterDadosSQlParaModelo(resultadoDoSql)
      )
      .then((clientes) => UtilOracle.finalize(connection, clientes))
      .catch((error) => Util.erro(error));
  };

  private async converterDadosSQlParaModelo(
    result: OracleDB.Result<unknown>
  ): Promise<Array<Cliente>> {
    return result.rows.map((coluna) => this.transformarResultado(coluna));
  }

  private transformarResultado = (columns: any): Cliente => {
    const { CODIGO, CLIENTE } = columns;
    return { codigo: CODIGO, cliente: CLIENTE };
  };
}

export default new ClienteService();
