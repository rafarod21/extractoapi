import { Router, Request, Response } from 'express';

const healthRouter = Router();

healthRouter.get('/', (request: Request, response: Response) => {
  response.status(200).json({
    status: 'OK',
    message: 'API is running',
    timestamp: new Date(),
  });
});

export default healthRouter;
