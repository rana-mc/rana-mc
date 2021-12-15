import { ForgeServer } from '@rana-mc/forge';
import RanaDB, { ranaDB } from '../../RanaDB/RanaDB';
import APIRoute from '../APIRoute';

export default class InstallAPI extends APIRoute {

  ranaDB: RanaDB;

  get TAG() {
    return "RanaAPI-install";
  }

  constructor() {
    super();

    this.ranaDB = ranaDB;
    this.init();
  }

  init = async () => {
    this.useInstall();
  }

  useInstall() {
    this.router.post('/install/:id', async (req, res) => {
      const serverId = req.params.id;
      this.log(`Installing with id = ${serverId}`);

      const servers = await this.ranaDB.getServers();
      res.send(servers);
    });
  }
}