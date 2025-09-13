import { Router, Request, Response } from 'express';
import clientRouter from './clientRoutes';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ message: '🚀 API funcionando!' });
});

router.use('/clients', clientRouter);

export default router;
