import axios, { AxiosInstance } from "axios";
import APIUrls from "./APIUrls";
import { Logger } from "./Logger";

// TODO: handle no apiKey case
export class CurseForge {

  public static TAG: string = "CurseForge";

  private logger: Logger = new Logger(CurseForge.TAG);
  private apiKey: string;
  private apiClient: AxiosInstance;

  constructor(config?: CurseForgeConfig) {
    this.apiClient = axios.create();

    if (config?.apiKey) {
      this.apiKey = config.apiKey;
      this.updateApiKey(this.apiKey);
    }
  }

  async getVersionTypes(refresh?: boolean) {
    try {
      const response = await this.apiClient.get(APIUrls.VersionTypesUrl);
      const types = response.data;

      this.logger.log(`getVersionTypes: ${types}`);

      return types;
    } catch (err) {
      this.logger.log(`Got error after getVersionTypes – ${err.message}`);
    }

    return null;
  }

  async getVersions(refresh?: boolean) {
    try {
      const response = await this.apiClient.get(APIUrls.VersionsUrl);
      const versions = response.data;

      this.logger.log(`getVersions: ${versions}`);

      return versions;
    } catch (err) {
      this.logger.log(`Got error after getVersions – ${err.message}`);
    }

    return null;
  }

  updateApiKey(apiKey: string) {
    this.logger.log(`call updateApiKey`);
    this.apiClient.defaults.headers.common = {
      'x-api-key': apiKey
    };
  }
}