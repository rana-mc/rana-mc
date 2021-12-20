export const convertExternalUrls = (urls: ExternalForgeCoreUrl[]): {
  installerUrl: string;
  changelogUrl: string;
  mdkUrl: string;
} => urls.reduce((acc, curr) => {
  if (curr.name === 'Changelog') return { ...acc, changelogUrl: curr.url };

  // Old versions got client / server, but new versions – universal installer
  if (curr.name === 'Server') return { ...acc, installerUrl: curr.url };
  if (curr.name === 'Universal') return { ...acc, installerUrl: curr.url };
  if (curr.name === 'Installer') return { ...acc, installerUrl: curr.url };

  if (curr.name === 'Mdk') return { ...acc, mdkUrl: curr.url };

  return acc;
}, {
  installerUrl: null,
  changelogUrl: null,
  mdkUrl: null,
});

export const extractDownloadUrl = (url: string): string => url.match(/&url=(.+)/)[1];
export const extractInstallerFilename = (url: string): string => url.match(/\/(forge-.+)/)[1];
export const extractCoreFilename = (url: string): string => extractInstallerFilename(url).replace('-installer', '');
