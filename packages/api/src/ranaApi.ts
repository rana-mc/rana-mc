import { Router } from 'express';
import { db } from '@rana/db';
import { apiClient, getForgeVersionUrl, log } from './utils';
import axios from 'axios';
import { parseCores } from './utils/parse';

// Minecraft
const GAME_ID = 432;

export const getRanaAPIRouter = () => {
  const router = Router();

  router.use('/version', async (req, res) => {
    if (db.getGameVersions().length) {
      log(`Response from RanaDB`);
      return res.send(db.getGameVersions());
    }

    try {
      const response = await apiClient.get(`/v1/games/${GAME_ID}/version-types`);
      const versions = response.data;

      await db.setGameVersions(versions.data);
      res.send(versions.data);
    } catch (err) {
      log(err.message);
      res.sendStatus(500);
    }
  });

  router.use('/core', async (req, res) => {
    const { version } = req.query as { version: string };

    if (db.getCores(version).length) {
      log(`Response from RanaDB`);
      return res.send(db.getCores(version));
    }

    try {
      const forgeUrl = getForgeVersionUrl(version);
      log(`Parsing ${forgeUrl}`);

      const response = await axios.get(forgeUrl);
      const cores = parseCores(response.data, version);
      log(`Found ${cores.length} cores`);

      await db.setCores(version, cores);
      res.send(cores);
    } catch (err) {
      log(err.message);
      res.sendStatus(500);
    }
  });

  return router;
};