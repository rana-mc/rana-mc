import { Router } from 'express';
import { db } from '@rana/db';
import { getForgeVersionUrl, log } from '../utils';
import axios from 'axios';
import { parseCores } from '../utils/parseForgeCore';

export const getCoresAPI = () => {
  const router = Router();

  // TODO: make it by 'type' in query
  router.use('/forge-cores', async (req, res) => {
    const { version, force } = req.query as { version: string, force: string };
    const isForceRefresh = !!force;

    if (db.getForgeCores(version).length && !isForceRefresh) {
      log(`Response from RanaDB`);
      return res.send(db.getForgeCores(version));
    }

    try {
      const forgeUrl = getForgeVersionUrl(version);
      log(`Parsing ${forgeUrl}`);

      const response = await axios.get(forgeUrl);
      const cores = parseCores(response.data, version);
      log(`Found ${cores.length} cores`);

      await db.setForgeCores(version, cores);
      res.send(cores);
    } catch (err) {
      log(err.message);
      res.sendStatus(500);
    }
  });

  // TODO: parse fabric cores?
  router.use('/fabric-cores', async (req, res) => {
    res.send([]);
  });

  return router;
};