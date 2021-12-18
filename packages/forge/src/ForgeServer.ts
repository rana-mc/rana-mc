import { ChildProcess } from "child_process";
import EventEmitter from "events";
import { Logger } from "./Logger";
import ServerWorkspace from "./ServerWorkspace";

export class ForgeServer extends EventEmitter {

  public static TAG = "ForgeServer";

  logger: Logger = new Logger(ForgeServer.TAG);
  server: Server;
  process: ChildProcess
  workspace: ServerWorkspace;

  constructor(server: Server, outputHandler?: OutputHandler) {
    super();

    this.server = server;
    this.workspace = new ServerWorkspace(server, outputHandler);
  }

  get id() {
    return this.server.id
  }

  async installCore() {
    this.logger.log(`call installCore of ForgeServer, ${JSON.stringify(this.server)}`);

    await this.workspace.downloadCore(this.server.core);
    await this.workspace.installCore(this.server.core);
  }

  async start() {
    this.process = await this.workspace.startCore(this.server.core);
  }

  exec(command: string) {

  }

  stop() {
    this.process.stdin.write('stop\n');
    this.process.stdout.pipe(process.stdout);
  }

  removeCore() {

  }

  clear() {
    this.workspace.clear();
  }
}