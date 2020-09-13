class ClienteSql {
  porFiltro = (codigo: number, nome: string) => {
    return `
      SELECT 
        C.CODCLI, 
        C.CLIENTE,
        C.ENDERCOB,
        C.BAIRROCOB,
        C.FANTASIA,
        C.DTCADASTRO
      FROM 
        PCCLIENT C
      WHERE
        C.CODCLI = ${codigo}
      OR
        UPPER(C.CLIENTE) LIKE UPPER('${nome}%')
    `;
  };
}
/**
 * dessa forma irá pesquisar se em algum campo da tabela possui o nome informado
   UPPER(C.CLIENTE) LIKE UPPER('%${nome}%')
 * 

   UPPER(C.CLIENTE) LIKE UPPER('%${nome}%')
   Já dessa forma, só irá mostrar os campos que começam com o nome informado
 */

export default new ClienteSql();
