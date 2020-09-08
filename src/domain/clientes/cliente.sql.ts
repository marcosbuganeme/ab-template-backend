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

export default new ClienteSql();
