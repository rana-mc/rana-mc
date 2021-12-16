import { ForgeServer } from '@rana-mc/forge';
import { FabricServer } from '@rana-mc/fabric';

import APIRoute from '../APIRoute';
import RanaSocket from '../socket/RanaSocket';
import RanaDB, { ranaDB } from '../../RanaDB/RanaDB';

enum ServerCoreType {
  Forge = 'forge',
  Fabric = 'fabric',
}

export default class InstallAPI extends APIRoute {

  socket: RanaSocket
  ranaDB: RanaDB;

  get TAG() {
    return "RanaAPI-install";
  }

  constructor(socket: RanaSocket) {
    super();

    this.socket = socket;
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

      if (server.core.type === ServerCoreType.Forge) {
        new ForgeServer(server, this.handleLog).installCore();
      }

      if (server.core.type === ServerCoreType.Fabric) {
        new FabricServer(server, this.handleLog).installCore();
      }

      const servers = await this.ranaDB.getServers();
      res.send(servers);
    });
  }

  handleLog(message: string) {
    this.log(message);
  }
}