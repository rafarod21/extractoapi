import prisma from '../libs/prismaClient';
import { AppError } from '../utils/AppError';
import { z } from 'zod';
import { clientSchema } from '../schemas/clientSchema';

type ClientInput = z.infer<typeof clientSchema>;

export async function listClients() {
  return prisma.client.findMany();
}

export async function getClientById(clientId: string) {
  const client = await prisma.client.findUnique({
    where: { id: clientId },
  });

  if (!client) {
    throw new AppError(404, `Client ID not found.`);
  }

  return client;
}

async function existClientWithCpfCnpj(cpfCnpj: string) {
  const client = await prisma.client.findUnique({
    where: { cpfCnpj },
  });

  if (!client) {
    return false;
  }

  return true;
}

export async function createClient(clientInput: ClientInput) {
  if (await existClientWithCpfCnpj(clientInput.cpfCnpj)) {
    throw new AppError(400, 'Client with this CPF/CNPJ already exists.');
  }

  const created = await prisma.client.create({
    data: {
      name: clientInput.name,
      personType: clientInput.personType,
      cpfCnpj: clientInput.cpfCnpj,
      email: clientInput.email,
      birthDate: clientInput.birthDate
        ? new Date(clientInput.birthDate)
        : clientInput.birthDate,
      landline: clientInput.landline,
      mobilePhone: clientInput.mobilePhone,
      addressStreet: clientInput.address?.street,
      addressNumber: clientInput.address?.number,
      addressComplement: clientInput.address?.complement,
      addressNeighborhood: clientInput.address?.neighborhood,
      addressCity: clientInput.address?.city,
      addressUf: clientInput.address?.uf,
      addressZipCode: clientInput.address?.zipCode,
    },
  });

  return created;
}

export async function updateClientReplace(
  clientId: string,
  clientInput: ClientInput
) {
  const client = await getClientById(clientId);

  if (client.cpfCnpj !== clientInput.cpfCnpj) {
    if (await existClientWithCpfCnpj(clientInput.cpfCnpj)) {
      throw new AppError(400, 'Client with this CPF/CNPJ already exists.');
    }
  }

  const updated = await prisma.client.update({
    where: { id: clientId },
    data: {
      name: clientInput.name,
      personType: clientInput.personType,
      cpfCnpj: clientInput.cpfCnpj,
      email: clientInput.email,
      birthDate: clientInput.birthDate
        ? new Date(clientInput.birthDate)
        : clientInput.birthDate,
      landline: clientInput.landline,
      mobilePhone: clientInput.mobilePhone,
      addressStreet: clientInput.address?.street,
      addressNumber: clientInput.address?.number,
      addressComplement: clientInput.address?.complement,
      addressNeighborhood: clientInput.address?.neighborhood,
      addressCity: clientInput.address?.city,
      addressUf: clientInput.address?.uf,
      addressZipCode: clientInput.address?.zipCode,
    },
  });

  return updated;
}

export async function updateClientPartial(
  clientId: string,
  clientPartialInput: Partial<ClientInput>
) {
  const client = await getClientById(clientId);

  if (
    clientPartialInput.cpfCnpj &&
    client.cpfCnpj !== clientPartialInput.cpfCnpj &&
    (await existClientWithCpfCnpj(clientPartialInput.cpfCnpj))
  ) {
    throw new AppError(400, 'Client with this CPF/CNPJ already exists.');
  }

  const updated = await prisma.client.update({
    where: { id: clientId },
    data: {
      name: clientPartialInput.name,
      personType: clientPartialInput.personType,
      cpfCnpj: clientPartialInput.cpfCnpj,
      email: clientPartialInput.email,
      birthDate: clientPartialInput.birthDate
        ? new Date(clientPartialInput.birthDate)
        : clientPartialInput.birthDate,
      landline: clientPartialInput.landline,
      mobilePhone: clientPartialInput.mobilePhone,
      addressStreet: clientPartialInput.address?.street,
      addressNumber: clientPartialInput.address?.number,
      addressComplement: clientPartialInput.address?.complement,
      addressNeighborhood: clientPartialInput.address?.neighborhood,
      addressCity: clientPartialInput.address?.city,
      addressUf: clientPartialInput.address?.uf,
      addressZipCode: clientPartialInput.address?.zipCode,
    },
  });

  return updated;
}

export async function deleteClient(clientId: string) {
  const client = await getClientById(clientId);

  await prisma.client.delete({ where: { id: clientId } });

  return client;
}
