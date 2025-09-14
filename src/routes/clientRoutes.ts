import { Router, Request, Response } from 'express';
import { clientSchema } from '../schemas/clientSchema';
import { z, ZodError } from 'zod';
import prisma from '../libs/prismaClient';

const clientRouter = Router();

clientRouter.get('/', async (request: Request, response: Response) => {
  const clients = await prisma.client.findMany();
  response.json(clients);
});

clientRouter.get('/:clientId', async (request: Request, response: Response) => {
  const { clientId } = z.object({ clientId: z.string() }).parse(request.params);

  const client = await prisma.client.findUnique({
    where: { id: clientId },
  });

  if (!client) {
    return response.status(404).send();
  }

  return response.json(client);
});

clientRouter.post('/', async (request: Request, response: Response) => {
  let dataClient;

  try {
    dataClient = clientSchema.parse(request.body);
  } catch (error) {
    if (error instanceof ZodError) {
      return response.status(400).json({ errors: error.issues });
    }
    return response.status(500).json({ message: 'Internal Server Error' });
  }

  const client = await prisma.client.create({
    data: {
      name: dataClient.name,
      personType: dataClient.personType,
      cpfCnpj: dataClient.cpfCnpj,
      email: dataClient.email,
      birthDate: dataClient.birthDate,
      landline: dataClient.landline,
      mobilePhone: dataClient.mobilePhone,
      addressStreet: dataClient.address?.street,
      addressNumber: dataClient.address?.number,
      addressComplement: dataClient.address?.complement,
      addressNeighborhood: dataClient.address?.neighborhood,
      addressCity: dataClient.address?.city,
      addressUf: dataClient.address?.uf,
      addressZipCode: dataClient.address?.zipCode,
    },
  });

  return response.status(201).send({ clientId: client.id });
});

clientRouter.put('/:clientId', async (request: Request, response: Response) => {
  const { clientId } = z.object({ clientId: z.string() }).parse(request.params);

  const client = await prisma.client.findUnique({
    where: { id: clientId },
  });

  if (!client) {
    return response.status(404).send();
  }

  try {
    const dataClient = clientSchema.parse(request.body);

    const updateclient = await prisma.client.update({
      where: { id: clientId },
      data: {
        name: dataClient.name,
        personType: dataClient.personType,
        cpfCnpj: dataClient.cpfCnpj,
        email: dataClient.email,
        birthDate: dataClient.birthDate,
        landline: dataClient.landline,
        mobilePhone: dataClient.mobilePhone,
        addressStreet: dataClient.address?.street,
        addressNumber: dataClient.address?.number,
        addressComplement: dataClient.address?.complement,
        addressNeighborhood: dataClient.address?.neighborhood,
        addressCity: dataClient.address?.city,
        addressUf: dataClient.address?.uf,
        addressZipCode: dataClient.address?.zipCode,
      },
    });

    return response.json(updateclient);
  } catch (error) {
    if (error instanceof ZodError) {
      return response.status(400).json({ errors: error.issues });
    }

    return response.status(500).json({ error });
  }
});

clientRouter.patch(
  '/:clientId',
  async (request: Request, response: Response) => {
    const { clientId } = z
      .object({ clientId: z.string() })
      .parse(request.params);

    const client = await prisma.client.findUnique({
      where: { id: clientId },
    });

    if (!client) {
      return response.status(404).send();
    }

    const partialClientSchema = clientSchema.partial();

    try {
      const dataClient = partialClientSchema.parse(request.body);

      const updatedClient = await prisma.client.update({
        where: { id: clientId },
        data: {
          name: dataClient.name,
          personType: dataClient.personType,
          cpfCnpj: dataClient.cpfCnpj,
          email: dataClient.email,
          birthDate: dataClient.birthDate,
          landline: dataClient.landline,
          mobilePhone: dataClient.mobilePhone,
          addressStreet: dataClient.address?.street,
          addressNumber: dataClient.address?.number,
          addressComplement: dataClient.address?.complement,
          addressNeighborhood: dataClient.address?.neighborhood,
          addressCity: dataClient.address?.city,
          addressUf: dataClient.address?.uf,
          addressZipCode: dataClient.address?.zipCode,
        },
      });

      return response.json(updatedClient);
    } catch (error) {
      if (error instanceof ZodError) {
        return response.status(400).json({ errors: error.issues });
      }

      return response.status(500).json({ error });
    }
  }
);

clientRouter.delete(
  '/:clientId',
  async (request: Request, response: Response) => {
    const { clientId } = z
      .object({ clientId: z.string() })
      .parse(request.params);

    const client = await prisma.client.findUnique({
      where: { id: clientId },
    });

    if (!client) {
      return response.status(404).send();
    }

    await prisma.client.delete({
      where: { id: clientId },
    });

    return response.json(client);
  }
);

export default clientRouter;
