class FilialSql {
  todas(): string {
    return `
      SELECT 
        F.CODIGO, 
        F.RAZAOSOCIAL 
      FROM 
        PCFILIAL F
      WHERE
        F.CODIGO <> '99'
    `
  }

  porCodigo(codigo: string): string {
    return `
      SELECT 
        F.CODIGO, 
        F.RAZAOSOCIAL 
      FROM 
        PCFILIAL F
      WHERE 
        F.CODIGO <> '99'
      AND
        UPPER(F.CODIGO) LIKE UPPER('%${codigo}%') 
    `
  }
}

export default new FilialSql()