import { Router } from 'express';
import { db } from '@rana/db';
import { apiClient, getForgeVersionUrl, log } from './utils';
import axios from 'axios';

// Minecraft
const GAME_ID = 432;

export const getRanaAPIRouter = () => {
  const router = Router();

  router.use('/version', async (req, res) => {
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
      res.sendStatus(500);
    }
  });

  router.use('/core', async (req, res) => {
    const { version } = req.query;

    try {
      const forgeUrl = getForgeVersionUrl(version as string);
      const response = await axios.get(forgeUrl);

      log(forgeUrl);
      log(response.data);

      // TODO: parse forge cores

      res.send('Core...');
    } catch (err) {
      log(err.message);
      res.sendStatus(500);
    }
  });

  return router;
};