import RanaDB, { ranaDB } from '../../RanaDB/RanaDB';
import APIRoute from '../APIRoute';

export default class SettingsAPI extends APIRoute {
  ranaDB: RanaDB;

  get TAG() {
    return 'RanaAPI-settings';
  }

  constructor() {
    super();

    this.ranaDB = ranaDB;
    this.init();
  }

  init = async () => {
    this.useSettings();
  };

  useSettings() {
    this.router.get('/settings', async (req, res) => {
      const settings = await this.ranaDB.getSettings();
      res.send(settings);
    });

    this.router.post('/settings', async (req, res) => {
      const { body } = req;
      await this.ranaDB.setSettings(body);

      const settings = await this.ranaDB.getSettings();
      res.send(settings);
    });
  }
}
