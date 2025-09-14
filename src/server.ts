import express from 'express';
import cors from 'cors';
import routes from './routes';
import { resourceNotFoundHandler } from './middlewares/resourceNotFound';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(resourceNotFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
