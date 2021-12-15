import axios from 'axios';
import { forgeLocalDB } from './ForgeLocalDB';

import { Logger } from './Logger';
import { parseCoresFromHTML } from './utils/parse';

export class ForgeCores {

  public static TAG = 'ForgeCores';
  public static logger: Logger = new Logger(ForgeCores.TAG);

  private baseUrl: string = `https://files.minecraftforge.net/net/minecraftforge/forge/`;

  getVersionCoresUrl(version: string) {
    const htmlForVersion = `index_${version}.html`;

    return `${this.baseUrl}${htmlForVersion}`;
  }

  async getCores(version: string, refresh?: boolean) {
    const forgeCoresUrl = this.getVersionCoresUrl(version);
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
      ForgeCores.logger.log(`(${version}) Got error after getCores – ${err.message}`);
    }

    return null;
  }
}