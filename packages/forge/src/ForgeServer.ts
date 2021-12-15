import { Logger } from "./Logger";

export class ForgeServer {
  public static TAG = "ForgeServer";

  logger: Logger = new Logger(ForgeServer.TAG);
  server: Server;

  constructor(server: Server) {
    this.server = server;;
  }

  installCore() {
    this.logger.log(`call installCore of ForgeServer, ${JSON.stringify(this.server)}`);
  }
}