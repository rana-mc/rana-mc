export default class APIUrls {
  public static GAME_ID: number = 432;

  public static HOST: string = 'https://api.curseforge.com';

  public static ENDPOINT: string = '/v1';

  static get getBaseUrl() {
    return `${APIUrls.HOST}${APIUrls.ENDPOINT}`;
  }

  static get GameVersionsUrl() {
    return `${APIUrls.getBaseUrl}/games/${APIUrls.GAME_ID}/versions`;
  }

  static get VersionTypesUrl() {
    return `${APIUrls.getBaseUrl}/games/${APIUrls.GAME_ID}/version-types`;
  }
}
