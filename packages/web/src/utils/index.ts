export * from './apiClient';

export const log = (message: string) => {
  console.log(`[WEB]: ${message}`);
};

// TODO: fix import from @rana-mc/db with isolatedModules?
export const enum CoreType {
  Forge = 'forge',
  Fabric = 'fabric',
}
