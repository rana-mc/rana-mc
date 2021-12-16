import { ForgeServer } from '@rana-mc/forge';
import { ChildProcess } from 'child_process';
import { FabricServer } from '@rana-mc/fabric';

import APIRoute from '../APIRoute';
import RanaSocket from '../socket/RanaSocket';
import RanaDB, { ranaDB } from '../../RanaDB/RanaDB';

enum ServerCoreType {
  Forge = 'forge',
  Fabric = 'fabric',
}

// TODO: IMPORTANT – move on socket side
export default class CoreAPI extends APIRoute {

  ranaSocket: RanaSocket
  ranaDB: RanaDB;
  ranaProcesses: { [pid: string]: ChildProcess };

  get TAG() {
    return "RanaAPI-core";
  }

  constructor(ranaSocket: RanaSocket) {
    super();

    this.ranaSocket = ranaSocket;
    this.ranaDB = ranaDB;
    this.ranaProcesses = {};

    this.init();
  }

  init = async () => {
    this.useInstall();
    this.useStart();
    this.useStop();
  }

  useInstall() {
    this.router.post('/core/install/:id', async (req, res) => {
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

  useStart() {
    this.router.post('/core/start/:id', async (req, res) => {
      const serverId = req.params.id;
      const server = await ranaDB.findServer(serverId);

      this.log(`Starting server with id = ${serverId}`);

      if (server.core.type === ServerCoreType.Forge) {
        const process = await new ForgeServer(server, this.handleLog).startCore();

        this.ranaProcesses[process.pid] = process;
        ranaDB.updateServer({ ...server, processId: process.pid });
      }

      if (server.core.type === ServerCoreType.Fabric) {
        const process = await new FabricServer(server, this.handleLog).startCore();

        this.ranaProcesses[process.pid] = process;
        ranaDB.updateServer({ ...server, processId: process.pid });
      }

      const servers = await this.ranaDB.getServers();
      res.send(servers);
    });
  }

  useStop() {
    this.router.post('/core/stop/:id', async (req, res) => {
      const serverId = req.params.id;
      const server = await ranaDB.findServer(serverId);

      this.log(`Stopping server with id = ${serverId}`);

      this.ranaProcesses[server.processId].stdin.write('stop\n');
      this.ranaProcesses[server.processId].stdout.pipe(process.stdout);
      ranaDB.updateServer({ ...server, processId: null });

      const servers = await this.ranaDB.getServers();
      res.send(servers);
    });
  }

  private handleLog = (message: string) => {
    this.log(message);
    this.ranaSocket.log(message);
  }
}