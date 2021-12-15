import RanaDB, { ranaDB } from '../../RanaDB/RanaDB';
import APIRoute from '../APIRoute';

export default class ServersAPI extends APIRoute {

  ranaDB: RanaDB;

  get TAG() {
    return "RanaAPI-servers";
  }

  constructor() {
    super();

    this.ranaDB = ranaDB;
    this.init();
  }

  init = async () => {
    this.useServers();
  }

  useServers() {
    this.router.get('/servers', async (req, res) => {
      const servers = await this.ranaDB.getServers();
      res.send(servers);
    });

    this.router.post('/servers', async (req, res) => {
      const server: Server = req.body;
      await this.ranaDB.addServer(server);

      const servers = await this.ranaDB.getServers();
      res.send(servers);
    });

    this.router.delete('/servers', async (req, res) => {
      const server: Server = req.body;
      await this.ranaDB.removeServer(server);

      const servers = await this.ranaDB.getServers();
      res.send(servers);
    });

  }
}