import { Router } from 'express';
import { db } from '@rana-mc/db';
import { apiClient, log } from '../utils';

// Minecraft
const GAME_ID = 432;

export const getVersionsAPI = () => {
  const router = Router();

  router.use('/version-types', async (req, res) => {
    const { force } = req.query as { force: string };
    const isForceRefresh = !!force;

    if (db.getVersionTypes().length && !isForceRefresh) {
      log(`Response from RanaDB`);
      return res.send(db.getVersionTypes());
    }

    try {
      const response = await apiClient.get(`/v1/games/${GAME_ID}/version-types`);
      const types = response.data;

      await db.setVersionTypes(types.data);
      res.send(types.data);
    } catch (err) {
      log(err.message);
      res.sendStatus(500);
    }
  });

  router.use('/versions', async (req, res) => {
    const { force } = req.query as { force: string };
    const isForceRefresh = !!force;

    if (db.getGameVersions().length && !isForceRefresh) {
      log(`Response from RanaDB`);
      return res.send(db.getGameVersions());
    }

    try {
      const response = await apiClient.get(`/v1/games/${GAME_ID}/versions`);
      const versions = response.data;

      await db.setGameVersions(versions.data);
      res.send(versions.data);
    } catch (err) {
      log(err.message);
      res.sendStatus(500);
    }
  });

  return router;
};