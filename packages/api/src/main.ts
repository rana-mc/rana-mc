import express from 'express';
import { config as makeEnvs } from 'dotenv';
import RanaDB from '@rana/db';
import { log } from './utils';
import { getCurseForgeProxy } from './proxy';
import { getRanaAPIRouter } from './ranaApi';

const API_PORT = 3000;

const main = () => {
  const db = new RanaDB();
  db.init();

  log(`RanaDB: ${JSON.stringify(db.data())}`);

  // TODO: not secure? debug mode?
  log(`API key is ${process.env.CURSE_API_KEY}`);

  const app = express();

  app.use('/api', getRanaAPIRouter());
  app.use('/v1', getCurseForgeProxy());

  app.listen(API_PORT, () => {
    log(`Working on ${API_PORT} port...`);
  });
};


makeEnvs();
main();