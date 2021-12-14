export const log = (message: string) => {
  console.log(`[API]: ${message}`);
};

export const getForgeVersionUrl = (version: string) => {
  const baseUrl = `https://files.minecraftforge.net/net/minecraftforge/forge/`;
  const htmlForVersion = `index_${version}.html`;

  return `${baseUrl}${htmlForVersion}`;
}

export * from './curseApiClient';