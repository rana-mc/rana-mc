import { ChildProcess } from 'child_process';
import EventEmitter from 'events';
import { Logger } from "./Logger";

export class FabricServer extends EventEmitter {

  public static TAG = "FabricServer";

  logger: Logger = new Logger(FabricServer.TAG);
  server: Server;

  constructor(server: Server, outputHandler?: OutputHandler) {
    super();

    this.server = server;
  }

  get id() {
    return this.server.id
  }

  async installCore() {
    this.logger.log(`call installCore of FabricServer, ${JSON.stringify(this.server)}`);
  }

  async start() {

  }

  exec(command: string) {

  }

  stop() {

  }

  removeCore() {

  }

  clear() {

  }

}