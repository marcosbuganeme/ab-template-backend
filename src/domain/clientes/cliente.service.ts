import OracleDB from 'oracledb';

import { Oracle } from '../../infra';
import { Util, UtilOracle } from '../../components';

import { Cliente, ClienteSql, ClienteSchema } from './';

class ClienteService {

  obterClientesExportados = async () => {
    return await ClienteSchema
      .find()
      .then(clientes => Util.recuperar(clientes))
      .catch(error => Util.erro(error))
  }

  exportarDados = async () => {
    let connection: OracleDB.Connection = null

    await Oracle.conectar()
      .then(poolConexaoOracle => connection = poolConexaoOracle)
      .then(() => UtilOracle.query(connection, ClienteSql.todos()))
      .then(resultadoDoSql => this.converterDadosSQlParaModelo(resultadoDoSql))
      .then(clientes => {
        connection.close()
        return clientes
      })
      .then(clientes => clientes.forEach(cliente => ClienteSchema.create(cliente)))
      .catch((error) => Util.erro(error));
  }

  pesquisarCliente = async (codigo: number, nome: string) => {
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
    const {
      CODCLI,
      CLIENTE,
      ENDERCOB,
      BAIRROCOB,
      FANTASIA,
      DTCADASTRO,
    } = columns;
    return {
      codcli: CODCLI,
      cliente: CLIENTE,
      endercob: ENDERCOB,
      bairrocob: BAIRROCOB,
      fantasia: FANTASIA,
      dtCadastro: DTCADASTRO,
    };
  };
}

export default new ClienteService();
