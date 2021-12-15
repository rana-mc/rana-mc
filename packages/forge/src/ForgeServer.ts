import { Logger } from "./Logger";
import ServerWorkspace from "./ServerWorkspace";

export class ForgeServer {
  
  public static TAG = "ForgeServer";

  logger: Logger = new Logger(ForgeServer.TAG);
  server: Server;
  workspace: ServerWorkspace;

  constructor(server: Server) {
    this.server = server;
    this.workspace = new ServerWorkspace(server);
  }

  installCore() {
    this.logger.log(`call installCore of ForgeServer, ${JSON.stringify(this.server)}`);
    this.workspace.downloadCore(this.server.core);
  }
}