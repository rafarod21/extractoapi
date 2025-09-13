export class CNPJ {
  // private static readonly tamanhoCNPJComDV = 14;
  private static readonly tamanhoCNPJSemDV = 12;
  private static readonly regexCNPJ = /^([A-Z\d]){12}(\d){2}$/;
  private static readonly regexTodosCaracteresIguais = /^([A-Z\d])\1*$/;
  private static readonly valorBase = '0'.charCodeAt(0);
  private static readonly pesosDV = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  static isValid(cnpj: string): boolean {
    if (!this.regexCNPJ.test(cnpj)) {
      return false;
    }

    if (this.regexTodosCaracteresIguais.test(cnpj)) {
      return false;
    }

    const dvInformado = cnpj.substring(this.tamanhoCNPJSemDV);
    const dvCalculado = this.calculaDV(
      cnpj.substring(0, this.tamanhoCNPJSemDV)
    );

    return dvInformado === dvCalculado;
  }

  private static calculaDV(cnpjSemDV: string): string {
    let somatorioDV1 = 0;
    let somatorioDV2 = 0;

    for (let i = 0; i < this.tamanhoCNPJSemDV; i++) {
      const asciiDigito = cnpjSemDV.charCodeAt(i) - this.valorBase;
      somatorioDV1 += asciiDigito * this.pesosDV[i + 1];
      somatorioDV2 += asciiDigito * this.pesosDV[i];
    }

    const dv1 = somatorioDV1 % 11 < 2 ? 0 : 11 - (somatorioDV1 % 11);
    somatorioDV2 += dv1 * this.pesosDV[this.tamanhoCNPJSemDV];
    const dv2 = somatorioDV2 % 11 < 2 ? 0 : 11 - (somatorioDV2 % 11);

    return `${dv1}${dv2}`;
  }
}
