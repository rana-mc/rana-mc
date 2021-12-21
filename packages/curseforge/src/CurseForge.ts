import axios, { AxiosInstance } from 'axios';
import APIUrls from './APIUrls';
import { curseForgeLocalDB } from './CurseForgeLocalDB';
import { Logger } from './Logger';

// TODO: handle no apiKey case
export class CurseForge {
  public static TAG: string = 'CurseForge';

  private logger: Logger = new Logger(CurseForge.TAG);

  private apiKey: string;

  private apiClient: AxiosInstance;

  constructor(apiKey?: string) {
    this.apiClient = axios.create();

    if (apiKey) {
      this.apiKey = apiKey;
      this.updateApiKey(this.apiKey);
    }
  }

  async getVersionTypes(refresh?: boolean) {
    const versionTypesFromDB = curseForgeLocalDB.getVersionTypes();

    if (!refresh && versionTypesFromDB.length) return versionTypesFromDB;

    try {
      const response = await this.apiClient.get(APIUrls.VersionTypesUrl);
      const { data: versionTypes } = response.data;

      this.logger.log(`getVersionTypes: ${JSON.stringify(versionTypes)}`);

      curseForgeLocalDB.setVersionTypes(versionTypes);
      return versionTypes;
    } catch (err) {
      this.logger.log(`Got error after getVersionTypes – ${err.message}`);
    }

    return null;
  }

  async getGameVersions(refresh?: boolean) {
    const gameVersionsFromDB = curseForgeLocalDB.getGameVersions();

    if (!refresh && gameVersionsFromDB.length) return gameVersionsFromDB;

    try {
      const response = await this.apiClient.get(APIUrls.GameVersionsUrl);
      const { data: gameVersions } = response.data;

      this.logger.log(`getVersions: ${JSON.stringify(gameVersions)}`);

      curseForgeLocalDB.setGameVersions(gameVersions);
      return gameVersions;
    } catch (err) {
      this.logger.log(`Got error after getVersions – ${err.message}`);
    }

    return null;
  }

  updateApiKey(apiKey: string) {
    this.logger.log('call updateApiKey');
    this.apiClient.defaults.headers.common = {
      'x-api-key': apiKey,
    };
  }
}
