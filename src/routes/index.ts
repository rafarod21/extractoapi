import { Router, Request, Response } from 'express';
import clientRouter from './clientRoutes';
import documentRouter from './documentRoutes';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ message: '🚀 API funcionando!' });
});

router.use('/clients', clientRouter);
router.use('/documents', documentRouter);

export default router;
