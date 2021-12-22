const FABRIC_LOADERS_URL: string = 'https://meta.fabricmc.net/v2/versions/loader';

export const getFabricServerUrl = (gameVersion: string, loaderVersion: string, installerVersion: string) => {
  const serverPath = `${gameVersion}/${loaderVersion}/${installerVersion}/`;
  const serverUrl = `${FABRIC_LOADERS_URL}/${serverPath}server/jar`;

  return serverUrl;
}