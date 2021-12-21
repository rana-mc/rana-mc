import EventEmitter from 'events';
import { Logger } from './Logger';

export class FabricServer extends EventEmitter {
  public static TAG = 'FabricServer';

  logger: Logger = new Logger(FabricServer.TAG);

  server: Server;

  constructor(server: Server) {
    super();

    this.server = server;
  }

  get id() {
    return this.server.id;
  }

  async installCore() {
    this.logger.log(`call installCore of FabricServer, ${JSON.stringify(this.server)}`);
  }

  async start() {
    return Promise.resolve();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  exec(command: string) {}

  stop() {}

  removeCore() {}

  remove() {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(server: Server): FabricServer {
    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  acceptEULA(accept: boolean) {}
}
