import { z } from 'zod';
import { validateCPFCNPJ, TIPOS_PESSOA } from '../utils/validationCPFCNPJ';

const REGEX_ZIP_CODE = /^\d{8}$/; // Example: 12345678
const REGEX_LANDLINE = /^\d{10}$/; // Example: 4412345678
const REGEX_MOBILE = /^\d{11}$/; // Example: 44123456789

const addressSchema = z.object({
  street: z.string().min(1),
  number: z.string(),
  complement: z.string().optional(),
  neighborhood: z.string(),
  city: z.string(),
  uf: z.string(),
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
    birthDate: z.string().optional(),
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
