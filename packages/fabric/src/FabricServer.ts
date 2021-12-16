import { Logger } from "./Logger";

export class FabricServer {
  public static TAG = "FabricServer";

  logger: Logger = new Logger(FabricServer.TAG);
  server: Server;

  constructor(server: Server, outputHandler?: OutputHandler) {
    this.server = server;
  }

  async installCore() {
    this.logger.log(`call installCore() of FabricServer, ${JSON.stringify(this.server)}`);
  }

  async startCore() {
    this.logger.log(`call startCore() of FabricServer, ${JSON.stringify(this.server)}`);
  }

  async stopCore() {
    this.logger.log(`call stopCore() of FabricServer, ${JSON.stringify(this.server)}`);
  }

  async clear() {
    this.logger.log(`call clear() of FabricServer, ${JSON.stringify(this.server)}`);
  }
}