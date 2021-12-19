import axios from 'axios';
import { fabricLocalDB } from './FabricLocalDB';

import { Logger } from './Logger';

export class FabricCores {

  public static TAG = 'FabricCores';
  public static logger: Logger = new Logger(FabricCores.TAG);

  private baseUrl: string = `https://meta.fabricmc.net/v2/versions/installer`;

  async getCores(refresh?: boolean) {
    const coresFromDB = fabricLocalDB.getFabricCores();
    if (!refresh && coresFromDB) return coresFromDB;

    try {
      const response = await axios.get(this.baseUrl);
      const cores: OriginalFabricCore[] = response.data;
      const convertedCores: FabricCore[] = cores.map((core: OriginalFabricCore) => ({
        gameVersion: '*',
        coreVersion: core.version,
        installerUrl: core.url,
        maven: core.maven,
        stable: core.stable
      }));

      fabricLocalDB.setFabricCores(convertedCores);
      return cores;
    } catch (err) {
      FabricCores.logger.log(`Got error after getCores – ${err.message}`);
    }

    return null;
  }
}