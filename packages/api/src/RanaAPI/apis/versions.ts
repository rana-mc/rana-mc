import APIRoute from '../APIRoute';
import { CurseForge } from '@rana-mc/curseforge';

export default class VersionsAPI extends APIRoute {

  curseForge: CurseForge;

  get TAG() {
    return "RanaAPI-versions";
  }

  constructor() {
    super();
    this.curseForge = new CurseForge();
  }

  async init() {
    this.useVersions();
    this.useVersionTypes();
  }

  useVersions() {
    this.router.use('/versions', async (req, res) => {
      const versions = await this.curseForge.getVersions();

      if (!versions) return res.sendStatus(500);
      res.send(versions);
    });
  }

  useVersionTypes() {
    this.router.use('/version-types', async (req, res) => {
      const versionTypes = await this.curseForge.getVersionTypes();

      if (!versionTypes) return res.sendStatus(500);
      res.send(versionTypes);
    });
  }
}