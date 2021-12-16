import { Logger } from "./Logger";

export class FabricServer {
  public static TAG = "FabricServer";

  logger: Logger = new Logger(FabricServer.TAG);
  server: Server;

  constructor(server: Server, outputHandler?: OutputHandler) {
    this.server = server;
  }

  installCore() {
    this.logger.log(`call installCore of FabricServer, ${JSON.stringify(this.server)}`);
  }
}