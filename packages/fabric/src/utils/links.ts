export const extractDownloadUrl = (url: string): string => url.match(/&url=(.+)/)[1];
export const extractInstallerFilename = (url: string): string =>
  url.match(/\/(forge-.+)/)[1];
export const extractCoreFilename = (url: string): string =>
  extractInstallerFilename(url).replace('-installer', '');
