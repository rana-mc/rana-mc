import express, { Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { Logger } from './Logger';

import CoresAPI from './apis/cores';
import SettingsAPI from './apis/settings';
import VersionsAPI from './apis/versions';
import ServersAPI from './apis/servers';

export default class RanaAPI {

  public static TAG = 'RanaAPI';
  public static ENDPOINT = '/api';
  public static PORT: number = 3001;

  private logger: Logger;
  private app: Express;

  constructor() {
    this.logger = new Logger(RanaAPI.TAG);
    this.app = express();
  }

  async init() {
    this.applyUtilityMiddlewares();
    this.applyApis();
  }

  applyApis() {
    this.app.use(RanaAPI.ENDPOINT, new CoresAPI().router);
    this.app.use(RanaAPI.ENDPOINT, new ServersAPI().router);
    this.app.use(RanaAPI.ENDPOINT, new SettingsAPI().router);
    this.app.use(RanaAPI.ENDPOINT, new VersionsAPI().router);
  }

  applyUtilityMiddlewares() {
    this.app.use(cors({ origin: '*' }));
    this.app.use(bodyParser.json());
  }

  listen() {
    this.app.listen(RanaAPI.PORT, () => {
      this.logger.log(`Working on ${RanaAPI.PORT} port...`);
    });
  }
}