export const getFabricServerPath = (
  gameVersion: string,
  loaderVersion: string,
  installerVersion: string
) => {
  const serverFilenamePath = `${gameVersion}/${loaderVersion}/${installerVersion}/`;
  const serverPath = `${serverFilenamePath}server/jar`;

  return serverPath;
};
