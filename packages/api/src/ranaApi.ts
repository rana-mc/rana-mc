import { Router } from 'express';
import { db } from '@rana/db';
import { apiClient, getForgeVersionUrl, log } from './utils';
import axios from 'axios';
import { parseCores } from './utils/parse';

// Minecraft
const GAME_ID = 432;

export const getRanaAPIRouter = () => {
  const router = Router();

  router.use('/types', async (req, res) => {
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

  router.use('/cores', async (req, res) => {
    const { version, force } = req.query as { version: string, force: string };
    const isForceRefresh = !!force;

    if (db.getCores(version).length && !isForceRefresh) {
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