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
      const server = await ranaDB.findServer(serverId);

      this.log(`Installing server with id = ${serverId}`);
      new ForgeServer(server).installCore();

      const servers = await this.ranaDB.getServers();
      res.send(servers);
    });
  }
}