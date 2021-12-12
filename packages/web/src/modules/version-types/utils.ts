export const formatName = (name: string) => {
  return name.replace(/Minecraft/i, '').trim();
};

export const sortTypes = (versionTypes: VersionType[]) => {
  return versionTypes.slice().sort((a, b) => {
    return b?.id - a?.id;
  });
};

export const filterTypes = (versionTypes: VersionType[]) => {
  const TYPES_TO_REMOVE = ['Bukkit', 'Modloader', 'Addons', 'Minecraft Beta'];
  return versionTypes.filter((type) => {
    return !TYPES_TO_REMOVE.includes(type.name);
  });
};

export const formatTypes = (versionTypes: VersionType[]) => {
  return filterTypes(sortTypes(versionTypes));
}