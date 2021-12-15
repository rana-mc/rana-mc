import { CurseForge } from '@rana-mc/curseforge';
import RanaDB, { ranaDB } from '../../RanaDB/RanaDB';
import APIRoute from '../APIRoute';

export default class VersionsAPI extends APIRoute {

  ranaDB: RanaDB;
  curseForge: CurseForge;

  get TAG() {
    return "RanaAPI-versions";
  }

  constructor() {
    super();
    this.curseForge = new CurseForge();
    this.ranaDB = ranaDB;
  }

  async init() {
    this.useVersions();
    this.useVersionTypes();
    this.applySettingsHandler();
  }

  applySettings() {
    const settings = this.ranaDB.getSettings();
    this.curseForge.updateApiKey(settings.curseApiKey);
  }

  applySettingsHandler() {
    this.applySettings();
    this.log('Settings applied');

    this.ranaDB.setSettingsHandler((settings) => {
      this.log('Settings changed');
      this.curseForge.updateApiKey(settings.curseApiKey);
    });
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