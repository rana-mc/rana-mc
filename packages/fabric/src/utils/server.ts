export const getFabricServerPath = (
  gameVersion: string,
  loaderVersion: string,
  installerVersion: string
) => {
  const serverFilenamePath = `${gameVersion}/${loaderVersion}/${installerVersion}/`;
  const serverPath = `${serverFilenamePath}server/jar`;

  return serverPath;
};

// FIY: As example
// fabric-server-mc.1.18.1-loader.0.12.11-launcher.0.10.1.jar
export const getInstallerFilename = (core: FabricCore) => {
  const game = core.gameVersion;
  const loader = core.loader.version;
  const installer = core.installer.version;
  return `fabric-server-mc.${game}-loader.${loader}-launcher.${installer}.jar`;
};

export const getCoreFilename = getInstallerFilename;
