import { Router } from "express";
import { Logger } from "./Logger";

export default class APIRoute {

  private logger: Logger;
  public router: Router;

  constructor() {
    this.logger = new Logger(this.TAG);
    this.router = Router();

    this.log('Enabled.');
    this.init();
  }

  get TAG() {
    return "RanaAPIRoute";
  }

  init() { }

  log(message: string) {
    this.logger.log(message);
  }
}