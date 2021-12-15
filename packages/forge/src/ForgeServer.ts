import { Logger } from "./Logger";

export class ForgeServer {
  public static TAG = "ForgeServer";

  logger: Logger = new Logger(ForgeServer.TAG);
  data: ForgeCore;

  constructor(data: ForgeCore) {
    this.data = data;;
  }

  installCore() {
    this.logger.log('call installCore of ForgeServer');
  }
}