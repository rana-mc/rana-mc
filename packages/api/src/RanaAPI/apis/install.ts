import { ForgeServer } from '@rana-mc/forge';
import APIRoute from '../APIRoute';

export default class InstallAPI extends APIRoute {

  get TAG() {
    return "RanaAPI-install";
  }

  constructor() {
    super();

    this.init();
  }

  init = async () => {
    // TODO: make it by 'type' in query
    this.useForgeInstall();
    this.useFabricInstall();
  }

  useForgeInstall() {
    this.router.post('/forge-install', async (req, res) => {
      res.sendStatus(200);
    });
  }

  useFabricInstall() {
    this.router.post('/fabric-install', async (req, res) => {
      res.sendStatus(200);
    });
  }
}