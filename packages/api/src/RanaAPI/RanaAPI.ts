import express, { Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createServer as createHTTPServer, Server as HTTPServer } from 'http';

import { RanaSocketEvents } from '@rana-mc/types';
import { Logger } from './Logger';
import CoresAPI from './apis/cores';
import SettingsAPI from './apis/settings';
import VersionsAPI from './apis/versions';
import ServersAPI from './apis/servers';
import RanaSocket from './socket/RanaSocket';
import RanaDB, { ranaDB } from '../RanaDB/RanaDB';

export default class RanaAPI {
  public static TAG = 'RanaAPI';

  public static ENDPOINT = '/api';

  public static PORT: number = 3001;

  private logger: Logger;

  private server: HTTPServer;

  private app: Express;

  private ranaSocket: RanaSocket;

  private ranaDB: RanaDB;

  constructor() {
    this.app = express();
    this.ranaDB = ranaDB;
    this.logger = new Logger(RanaAPI.TAG);
    this.server = createHTTPServer(this.app);
    this.ranaSocket = new RanaSocket(this.server);
  }

  /**
   * Init Rana REST API and RanaSocket server.
   */
  public async init() {
    this.applyRanaSocket();
    this.applyUtilityMiddlewares();
    this.applyApis();
  }

  /**
   * Apply REST API endpoints.
   */
  private applyApis() {
    this.app.use(RanaAPI.ENDPOINT, new CoresAPI().router);
    this.app.use(RanaAPI.ENDPOINT, new ServersAPI().router);
    this.app.use(RanaAPI.ENDPOINT, new SettingsAPI().router);
    this.app.use(RanaAPI.ENDPOINT, new VersionsAPI().router);
  }

  /**
   * Apply utility middlewares, like cors() and bodyParser.
   */
  private applyUtilityMiddlewares() {
    this.app.use(cors({ origin: '*' }));
    this.app.use(bodyParser.json());
  }

  /**
   * Apply RanaSocket at same port of REST API server.
   * And listen servers updates.
   */
  private applyRanaSocket() {
    this.ranaSocket.initServers(this.ranaDB.getServers());

    this.ranaSocket.on(RanaSocketEvents.ServerUpdate, async (server) => {
      await this.ranaDB.updateServer(server);

      const updated = this.ranaDB.findServer(server.id);
      this.logger.log(`(ServerUpdate): ${JSON.stringify(updated)}`);

      /** Sending updated server from ranaDB to socket clients. */
      this.ranaSocket.emit(RanaSocketEvents.ClientServerUpdate, updated);
    });

    this.ranaSocket.on(RanaSocketEvents.ServersFlush, () => {
      const servers = this.ranaDB.getServers();
      this.logger.log(`(ServersFlush): ${JSON.stringify(servers)}`);

      /** Flush servers at socket. */
      this.ranaSocket.emit(RanaSocketEvents.SocketServersFlush, servers);
    });
  }

  /**
   * Start listen Rana REST API and RanaSocket server.
   */
  public listen() {
    this.server.listen(RanaAPI.PORT, () => {
      this.logger.log(`Working on ${RanaAPI.PORT} port...`);
    });
  }
}
