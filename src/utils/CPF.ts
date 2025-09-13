export class CPF {
  // private static readonly tamanhoCPFComDV = 11;
  private static readonly tamanhoCPFSemDV = 9;
  private static readonly regexCPFComDV = /^\d{11}$/;
  private static readonly regexTodosNumerosIguais = /^(\d)\1*$/;

  static isValid(cpf: string): boolean {
    if (!this.regexCPFComDV.test(cpf)) {
      return false;
    }

    if (this.regexTodosNumerosIguais.test(cpf)) {
      return false;
    }

    const dvInformado = cpf.substring(this.tamanhoCPFSemDV);
    const dvCalculado = this.calculaDV(cpf.substring(0, this.tamanhoCPFSemDV));

    return dvInformado === dvCalculado;
  }

  private static calculaDV(cpfSemDV: string): string {
    let somatorioDV1 = 0;
    let somatorioDV2 = 0;

    for (let i = 0; i < this.tamanhoCPFSemDV; i++) {
      const digito = parseInt(cpfSemDV.charAt(i), 10);
      somatorioDV1 += digito * (10 - i);
      somatorioDV2 += digito * (11 - i);
    }

    const dv1 = (somatorioDV1 * 10) % 11 === 10 ? 0 : (somatorioDV1 * 10) % 11;
    somatorioDV2 += dv1 * 2;
    const dv2 = (somatorioDV2 * 10) % 11 === 10 ? 0 : (somatorioDV2 * 10) % 11;

    return `${dv1}${dv2}`;
  }
}
