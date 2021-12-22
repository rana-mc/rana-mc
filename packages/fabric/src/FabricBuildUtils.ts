import axios from 'axios';
import { fabricLocalDB } from './FabricLocalDB';

import { Logger } from './Logger';

export class FabricBuildUtils {
  public static TAG = 'FabricBuildUtils';

  public static logger: Logger = new Logger(FabricBuildUtils.TAG);

  private installersUrl: string = 'https://meta.fabricmc.net/v2/versions/installer';

  private loadersUrl: string = 'https://meta.fabricmc.net/v2/versions/loader';

  async getInstallers(refresh?: boolean) {
    const installersFromDB = fabricLocalDB.getFabricInstallers();
    if (!refresh && installersFromDB) return installersFromDB;

    try {
      const response = await axios.get(this.installersUrl);
      const installers: FabricInstaller[] = response.data;

      fabricLocalDB.setFabricInstallers(installers);
      return fabricLocalDB;
    } catch (err) {
      FabricBuildUtils.logger.log(`Got error after getInstallers – ${err.message}`);
    }

    return null;
  }

  async getLoaders(refresh?: boolean) {
    const loadersFromDB = fabricLocalDB.getFabricLoaders();
    if (!refresh && loadersFromDB) return loadersFromDB;

    try {
      const response = await axios.get(this.loadersUrl);
      const loaders: FabricLoader[] = response.data;

      fabricLocalDB.setFabricLoaders(loaders);
      return fabricLocalDB;
    } catch (err) {
      FabricBuildUtils.logger.log(`Got error after getLoaders – ${err.message}`);
    }

    return null;
  }
}
