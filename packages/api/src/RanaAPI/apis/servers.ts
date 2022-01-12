import { FabricBuildUtils } from '@rana-mc/fabric';
import { ForgeBuildUtils } from '@rana-mc/forge';
import { ServerStatus } from '@rana-mc/types';
import RanaDB, { ranaDB } from '../../RanaDB/RanaDB';
import APIRoute from '../APIRoute';

export default class ServersAPI extends APIRoute {
  forgeBuildUtils: ForgeBuildUtils;

  fabricBuildUtils: FabricBuildUtils;

  ranaDB: RanaDB;

  get TAG() {
    return 'RanaAPI-servers';
  }

  constructor() {
    super();

    this.ranaDB = ranaDB;
    this.forgeBuildUtils = new ForgeBuildUtils();
    this.fabricBuildUtils = new FabricBuildUtils();

    this.init();
  }

  init = async () => {
    this.useServers();
  };

  // TODO: Maybe move into utils? Or helper?
  buildServer: BuildServerFunction = async (data: CreateServerRequestData) => {
    const coreBuilders = {
      // FIY: Yes, we can add more specific cores ;)
      forge: () => this.forgeBuildUtils.buildCore(data.gameVersionId, data.coreVersion),
      fabric: () =>
        this.fabricBuildUtils.buildCore(
          data.gameVersionId,
          data.installerVersion,
          data.loaderVersion
        ),
    };

    const core = await coreBuilders[data.coreType]();

    // FYI: Better way - build all need data on server, or not?
    return {
      id: data.id,
      name: data.name,
      gameVersion: data.gameVersionId,
      gameVersionTypeId: data.versionTypeId,
      status: ServerStatus.Created,
      mods: [],
      eula: false,
      startTimes: [],
      core,
    };
  };

  useServers() {
    this.router.get('/servers', async (req, res) => {
      const servers = await this.ranaDB.getServers();
      res.send(servers);
    });

    this.router.get('/servers/:id', async (req, res) => {
      const serverId = req.params.id;
      const server = this.ranaDB.findServer(serverId);

      return res.send(server);
    });

    this.router.post('/servers', async (req, res) => {
      const data: CreateServerRequestData = req.body;

      const server = await this.buildServer(data);
      await this.ranaDB.addServer(server);

      const servers = await this.ranaDB.getServers();
      return res.send(servers);
    });

    this.router.delete('/servers/:id', async (req, res) => {
      const serverId = req.params.id;
      await this.ranaDB.removeServer(serverId);

      const servers = await this.ranaDB.getServers();
      return res.send(servers);
    });

    this.router.put('/servers/:id', async (req, res) => {
      const server: Server = req.body;
      const serverId = req.params.id;

      if (serverId !== server.id) {
        return res.sendStatus(403);
      }

      await this.ranaDB.updateServer(server);

      const servers = await this.ranaDB.getServers();
      return res.send(servers);
    });
  }
}
