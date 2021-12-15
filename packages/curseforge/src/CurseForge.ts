import axios, { AxiosInstance } from "axios";
import APIUrls from "./ApiUrls";
import { Logger } from "./Logger";

export default class CurseForge {

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
    const response = await this.apiClient.get(APIUrls.VersionTypesUrl);
    const types = response.data;

    this.logger.log(`getVersionTypes: ${types}`);

    return types;
  }

  async getVersions(refresh?: boolean) {
    const response = await this.apiClient.get(APIUrls.VersionsUrl);
    const versions = response.data;

    this.logger.log(`getVersions: ${versions}`);

    return versions;
  }

  updateApiKey(apiKey: string) {
    this.logger.log(`call updateApiKey`);
    this.apiClient.defaults.headers.common = {
      'x-api-key': apiKey
    };
  }
}