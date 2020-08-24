import OracleDB from 'oracledb'

import BancoDados from './banco-dados.model'

class OracleDb {
  async conectar(banco: BancoDados = null): Promise<OracleDB.Connection> {
    let autenticacao = {}

    if (banco)
      autenticacao = {
        user: banco.usuario,
        password: banco.senha,
        connectString: `(DESCRIPTION=(ADDRESS = (PROTOCOL = TCP)(HOST = ${banco.ip})(PORT = ${banco.porta}))(CONNECT_DATA=(SERVER = DEDICATED)(SERVICE_NAME = ${banco.sid})))`
      }
    else
      autenticacao = {
        user: process.env.ORA_USER,
        password: process.env.ORA_PASS,
        connectString: `(DESCRIPTION=(ADDRESS = (PROTOCOL = TCP)(HOST = ${process.env.ORA_IP})(PORT = ${process.env.ORA_PORT}))(CONNECT_DATA=(SERVER = DEDICATED)(SERVICE_NAME = ${process.env.ORA_INSTANCE})))`
      }

    return await OracleDB
      .getConnection(autenticacao)
      .then(connection => connection)
      .catch(error => { throw error })
  }

  async fechar(connection: OracleDB.Connection): Promise<void> {
    if (connection) return

    await connection
      .close()
      .catch(error => console.error(error))
  }

  async testar(): Promise<void> {
    this.conectar()
      .then(connection => this.fechar(connection))
      .then(() => console.info('ORACLE IS OK'))
      .catch(error => console.error(error))
  }
}

export default new OracleDb()