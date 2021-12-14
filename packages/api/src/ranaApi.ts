import { Router } from 'express';
import { getCoresAPI } from './apis/cores';
import { getServersAPI } from './apis/server';
import { getSettingsAPI } from './apis/settings';
import { getVersionsAPI } from './apis/versions';

export const getRanaAPIRouter = () => {
  const router = Router();

  router.use(getVersionsAPI());
  router.use(getCoresAPI());
  router.use(getServersAPI());
  router.use(getSettingsAPI());

  return router;
};