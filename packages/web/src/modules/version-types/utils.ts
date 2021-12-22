export const formatName = (name: string) => name.replace(/Minecraft/i, '').trim();

export const sortTypes = (versionTypes: VersionType[]) =>
  // eslint-disable-next-line no-unsafe-optional-chaining
  versionTypes.slice().sort((a, b) => b?.id - a?.id);

export const filterTypes = (versionTypes: VersionType[]) => {
  const TYPES_TO_REMOVE = [
    'Bukkit',
    'Forge',
    'Fabric',
    'Java',
    'Modloader',
    'Addons',
    'Minecraft Beta',
  ];

  return versionTypes.filter((type) => !TYPES_TO_REMOVE.includes(type.name));
};

export const formatTypes = (versionTypes: VersionType[]) =>
  filterTypes(sortTypes(versionTypes));
