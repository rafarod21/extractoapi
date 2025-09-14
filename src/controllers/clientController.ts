import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import {
  listClients,
  getClientById,
  createClient,
  updateClientReplace,
  updateClientPartial,
  deleteClient,
} from '../services/clientService';
import { clientSchema } from '../schemas/clientSchema';

export async function handleListClients(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const clients = await listClients();
    return response.json(clients);
  } catch (error) {
    return next(error);
  }
}

export async function handleGetClient(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { clientId } = z
      .object({ clientId: z.string() })
      .parse(request.params);
    const client = await getClientById(clientId);
    return response.json(client);
  } catch (error) {
    return next(error);
  }
}

export async function handleCreateClient(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const dataClient = clientSchema.parse(request.body);
    const createdClient = await createClient(dataClient);
    return response.status(201).json({ createdClient });
  } catch (error) {
    return next(error);
  }
}

export async function handleReplaceClient(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { clientId } = z
      .object({ clientId: z.string() })
      .parse(request.params);
    const dataClient = clientSchema.parse(request.body);
    const updatedClient = await updateClientReplace(clientId, dataClient);
    return response.json(updatedClient);
  } catch (error) {
    return next(error);
  }
}

export async function handlePatchClient(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { clientId } = z
      .object({ clientId: z.string() })
      .parse(request.params);
    const partialClientSchema = clientSchema.partial();
    const dataClient = partialClientSchema.parse(request.body);
    const updatedClient = await updateClientPartial(clientId, dataClient);
    return response.json(updatedClient);
  } catch (error) {
    return next(error);
  }
}

export async function handleDeleteClient(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { clientId } = z
      .object({ clientId: z.string() })
      .parse(request.params);
    const deletedClient = await deleteClient(clientId);
    return response.json(deletedClient);
  } catch (error) {
    return next(error);
  }
}
