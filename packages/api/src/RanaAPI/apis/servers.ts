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
  }

  async init() {
    this.useServers();
  }

  useServers() {
    this.router.get('/servers', async (req, res) => {
      const servers = await this.ranaDB.getServers();
      res.send(servers);
    });

    this.router.post('/servers', async (req, res) => {
      const body: Server = req.body;
      await this.ranaDB.addServer(body);

      const servers = await this.ranaDB.getServers();
      res.send(servers);
    });
  }
}