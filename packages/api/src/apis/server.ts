import { Router } from 'express';

export const getServersAPI = () => {
  const router = Router();

  router.get('/servers', async (req, res) => {
    res.send('hello servers');
  });

  return router;
};