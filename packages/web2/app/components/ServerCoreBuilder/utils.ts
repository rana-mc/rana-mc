const FABRIC_LOADERS_URL: string = 'https://meta.fabricmc.net/v2/versions/loader';

export const getFabricServerUrl = (
  gameVersionId: string,
  loaderVersion: string,
  installerVersion: string
) => {
  const serverPath = `${gameVersionId}/${loaderVersion}/${installerVersion}/`;
  const serverUrl = `${FABRIC_LOADERS_URL}/${serverPath}server/jar`;

  return serverUrl;
};
