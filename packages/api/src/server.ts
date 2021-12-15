import { config as makeEnvs } from 'dotenv';
import RanaAPI from './RanaAPI/RanaAPI';

export const startApiServer = async () => {
  makeEnvs();

  const ranaApi = new RanaAPI();
  await ranaApi.init();

  ranaApi.listen();
};
