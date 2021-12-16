import { Logger } from "./Logger";
import ServerWorkspace from "./ServerWorkspace";

export class ForgeServer {

  public static TAG = "ForgeServer";

  logger: Logger = new Logger(ForgeServer.TAG);
  server: Server;
  workspace: ServerWorkspace;

  constructor(server: Server, outputHandler?: OutputHandler) {
    this.server = server;
    this.workspace = new ServerWorkspace(server, outputHandler);
  }

  async installCore() {
    this.logger.log(`call installCore of ForgeServer, ${JSON.stringify(this.server)}`);

    await this.workspace.downloadCore(this.server.core);
    await this.workspace.installCore(this.server.core);
  }

  async startCore() {
    await this.workspace.startCore(this.server.core);
  }
}