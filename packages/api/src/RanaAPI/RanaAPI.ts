import express, { Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createServer as createHTTPServer, Server as HTTPServer } from 'http'

import { Logger } from './Logger';
import CoresAPI from './apis/cores';
import SettingsAPI from './apis/settings';
import VersionsAPI from './apis/versions';
import ServersAPI from './apis/servers';
import RanaSocket from './socket/RanaSocket';

export default class RanaAPI {

  public static TAG = 'RanaAPI';
  public static ENDPOINT = '/api';
  public static PORT: number = 3001;

  private logger: Logger;
  private server: HTTPServer;
  private app: Express;
  private ranaSocket: RanaSocket;

  constructor() {
    this.logger = new Logger(RanaAPI.TAG);
    this.app = express();
    this.server = createHTTPServer(this.app);
    this.ranaSocket = new RanaSocket(this.server);
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
    this.server.listen(RanaAPI.PORT, () => {
      this.logger.log(`Working on ${RanaAPI.PORT} port...`);
    });
  }
}