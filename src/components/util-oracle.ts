import OracleDB from 'oracledb';

import Util from './util';

class UtilOracle {
  async query(
    connection: OracleDB.Connection,
    sql: string
  ): Promise<OracleDB.Result<unknown>> {
    console.info(sql);
    return connection.execute(
      sql,
      {},
      { outFormat: OracleDB.OUT_FORMAT_OBJECT }
    );
  }

  async insert(
    connection: OracleDB.Connection,
    sql: string
  ): Promise<OracleDB.Result<unknown>> {
    console.info(sql);
    return await connection.execute(sql, {}, { autoCommit: true });
  }

  async finalizeAndReturnRows(
    connection: OracleDB.Connection,
    result: OracleDB.Result<unknown>
  ): Promise<any> {
    return await connection.close().then(() => Util.recuperar(result.rows));
  }

  async finalize(connection: OracleDB.Connection, result: any): Promise<any> {
    return await connection.close().then(() => Util.recuperar(result));
  }
}

export default new UtilOracle();
