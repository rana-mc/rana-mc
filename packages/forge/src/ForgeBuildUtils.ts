import axios from 'axios';
import { forgeLocalDB } from './ForgeLocalDB';

import { Logger } from './Logger';
import { parseCoresFromHTML } from './utils/parse';

export class ForgeBuildUtils {
  public static TAG = 'ForgeBuildUtils';

  public static logger: Logger = new Logger(ForgeBuildUtils.TAG);

  private coresUrl: string = 'https://files.minecraftforge.net/net/minecraftforge/forge/';

  async getCores(version: string, refresh?: boolean) {
    const forgeCoresUrl = `${this.coresUrl}${`index_${version}.html`}`;
    if (!version) return null;

    const coresFromDB = forgeLocalDB.getForgeCores(version);
    if (!refresh && coresFromDB) return coresFromDB;

    try {
      const response = await axios.get(forgeCoresUrl);
      const html = await response.data;
      const coresFromHTML = await parseCoresFromHTML(html, version);

      forgeLocalDB.setForgeCores(version, coresFromHTML);
      return coresFromHTML;
    } catch (err) {
      ForgeBuildUtils.logger.log(
        `(${version}) Got error after getCores – ${err.message}`
      );
    }

    return null;
  }

  async buildCore(gameVersionId: string, 
    coreVersion: string): Promise<ForgeServerCore> {
    const core = forgeLocalDB.findCoreByVersion(gameVersionId, coreVersion);

    return {
      type: 'forge',
      ...core
    };
  }
}
