import { Router } from 'express';
import { db } from '@rana-mc/db';
import { log } from '../utils';

export const getServersAPI = () => {
  const router = Router();

  router.get('/servers', async (req, res) => {
    const servers = await db.getServers();
    res.send(servers);
  });

  router.post('/servers', async (req, res) => {
    const body: Server = req.body;

    try {
      await db.addServer(body);
      const servers = await db.getServers();

      res.send(servers);
    } catch (err) {
      log(err.message);
      res.sendStatus(500);
    }
  });

  return router;
};