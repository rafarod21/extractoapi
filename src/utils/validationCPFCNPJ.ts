import { CPF } from './CPF';
import { CNPJ } from './CNPJ';

const TIPO_PESSOA_FISICA = 'PF';
const TIPO_PESSOA_JURIDICA = 'PJ';
export const TIPOS_PESSOA = [TIPO_PESSOA_FISICA, TIPO_PESSOA_JURIDICA] as const;

function validateCPF(cpf: string): boolean {
  return CPF.isValid(cpf);
}

function validateCNPJ(cnpj: string): boolean {
  return CNPJ.isValid(cnpj);
}

export function validateCPFCNPJ(
  type: (typeof TIPOS_PESSOA)[number],
  cpfCnpj: string
): boolean {
  if (type === TIPO_PESSOA_FISICA) return validateCPF(cpfCnpj);
  if (type === TIPO_PESSOA_JURIDICA) return validateCNPJ(cpfCnpj);

  return false;
}
