import { Router } from 'express';
import {
  handleCreateClient,
  handleDeleteClient,
  handleGetClient,
  handleListClients,
  handlePatchClient,
  handleReplaceClient,
} from '../controllers/clientController';

const clientRouter = Router();

clientRouter.get('/', handleListClients);
clientRouter.get('/:clientId', handleGetClient);
clientRouter.post('/', handleCreateClient);
clientRouter.put('/:clientId', handleReplaceClient);
clientRouter.patch('/:clientId', handlePatchClient);
clientRouter.delete('/:clientId', handleDeleteClient);

export default clientRouter;
