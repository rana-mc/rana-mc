import { Router } from 'express';

export const getRanaAPIRouter = () => {
  const router = Router();

  router.use('/', (req, res) => {
    res.send('Hello from RanaAPI...');
  });

  return router;
};