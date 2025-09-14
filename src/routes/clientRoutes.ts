import { Router } from 'express';
import {
  handleCreateClient,
  handleDeleteClient,
  handleGetClient,
  handleListClients,
  handlePatchClient,
  handleReplaceClient,
} from '../controllers/clientController';
import { authenticateToken } from '../middlewares/auth';

const clientRouter = Router();

clientRouter.get('/', handleListClients);
clientRouter.get('/:clientId', handleGetClient);
clientRouter.post('/', handleCreateClient);
clientRouter.put('/:clientId', authenticateToken, handleReplaceClient);
clientRouter.patch('/:clientId', authenticateToken, handlePatchClient);
clientRouter.delete('/:clientId', authenticateToken, handleDeleteClient);

export default clientRouter;
