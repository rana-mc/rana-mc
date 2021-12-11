import { Router } from 'express';
import { db } from '@rana/db';
import { apiClient, log } from './utils';

// Minecraft
const GAME_ID = 432;

export const getRanaAPIRouter = () => {
  const router = Router();

  router.use('/versions', async (req, res) => {
    const data = db.data();

    if (data?.gameVersions?.length) {
      return res.send(data.gameVersions);
    }

    try {
      const response = await apiClient.get(`/v1/games/${GAME_ID}/version-types`);
      const versions = response.data;

      data.gameVersions = versions.data;
      await db.write();

      res.send(data.gameVersions);
    } catch (err) {
      log(err.message);
    }
  });

  return router;
};