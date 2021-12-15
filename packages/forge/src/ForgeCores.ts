import axios from 'axios';
import { parse } from 'node-html-parser';
import { Logger } from './Logger';
import { convertExternalUrls } from './utils';

export class ForgeCores {
  public static TAG = 'ForgeCores';

  logger: Logger = new Logger(ForgeCores.TAG);
  baseUrl: string = `https://files.minecraftforge.net/net/minecraftforge/forge/`;;

  getVersionCoresUrl(version: string) {
    const htmlForVersion = `index_${version}.html`;

    return `${this.baseUrl}${htmlForVersion}`;
  }

  async getCores(version: string) {
    const forgeCoresUrl = this.getVersionCoresUrl(version);

    if (!version) {
      return null;
    }

    try {
      const response = await axios.get(forgeCoresUrl);
      const html = await response.data;
      const coresFromHTML = await this.parseCoresFromHTML(html, version);

      return coresFromHTML;
    } catch (err) {
      this.logger.log(`(${version}) Got error after getCores – ${err.message}`);
    }

    return null;
  }

  async parseCoresFromHTML(html: string, version: string): Promise<Partial<ForgeCore>[]> {
    const page = parse(html);

    const downloads = [...page.querySelectorAll('.download-list tbody tr')];
    this.logger.log(`(${version}) Found ${downloads.length} forge core files...`);

    const cores = downloads.map(el => {
      const coreVersion = el.querySelector('.download-version').innerText.trim();
      const uploadTime = el.querySelector('.download-time').getAttribute('title');

      const links = [...el.querySelectorAll('.download-links li')];
      const urls = links.map(link => {
        return {
          url: link.querySelector('a').getAttribute('href'),
          name: link.querySelector('a').innerText.trim()
        }
      });

      return {
        gameVersion: version,
        coreVersion,
        uploadTime,
        ...convertExternalUrls(urls)
      }
    });

    return cores;
  }

}