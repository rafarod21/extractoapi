import { z } from 'zod';
import { validateCPFCNPJ, TIPOS_PESSOA } from '../utils/validationCPFCNPJ';

const REGEX_ZIP_CODE = /^\d{8}$/; // Example: 12345678
const REGEX_LANDLINE = /^\d{10}$/; // Example: 4412345678
const REGEX_MOBILE = /^\d{11}$/; // Example: 44123456789

const UFS = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
];

const addressSchema = z.object({
  street: z.string().min(1),
  number: z.string(),
  complement: z.string().optional(),
  neighborhood: z.string(),
  city: z.string(),
  uf: z.enum(UFS, {
    message: 'Invalid UF. Must be one of the valid Brazilian states.',
  }),
  zipCode: z
    .string()
    .regex(
      REGEX_ZIP_CODE,
      'Invalid ZIP code. Must contain only numbers (example: 12345678).'
    ),
});

export const clientSchema = z
  .object({
    name: z.string().min(3, 'Name must have at least 3 characters'),
    personType: z.enum(TIPOS_PESSOA, "Invalid option. Must be 'PF' or 'PJ'."),
    cpfCnpj: z.string(),
    address: addressSchema.optional(),
    email: z.email('Invalid email'),
    birthDate: z.iso.date().optional(),
    landline: z
      .string()
      .regex(
        REGEX_LANDLINE,
        'Invalid landline. Must contain only numbers with area code (example: 4412345678).'
      )
      .optional(),
    mobilePhone: z
      .string()
      .regex(
        REGEX_MOBILE,
        'Invalid mobilePhone. Must contain only numbers with area code (example: 44123456789).'
      )
      .optional(),
  })
  .refine(
    (data) => {
      return validateCPFCNPJ(data.personType, data.cpfCnpj);
    },
    {
      message: 'Invalid CPF/CNPJ for the provided personType.',
      path: ['personType', 'cpfCnpj'],
    }
  );
