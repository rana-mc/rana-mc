import { Router } from 'express';
import { db } from '@rana-mc/db';
import { log } from '../utils';

export const getSettingsAPI = () => {
  const router = Router();

  router.get('/settings', async (req, res) => {
    const settings = await db.getSettings();
    res.send(settings);
  });

  router.post('/settings', async (req, res) => {
    const body: Partial<Settings> = req.body;

    try {
      await db.setSettings(body);
      res.send({ success: true });
    } catch (err) {
      log(err.message);
      res.sendStatus(500);
    }
  });

  return router;
};