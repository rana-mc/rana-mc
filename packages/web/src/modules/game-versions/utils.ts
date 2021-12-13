export const sortVersions = (versions: string[]) => {
  return versions.slice().sort((a, b) => {
    return parseInt(b) - parseInt(a)
  });
};

export const filterVersions = (versions: string[]) => {
  return versions.filter((version) => {
    return !version.includes('Snapshot');
  });
};

export const formatVersions = (versions: string[]) => {
  return filterVersions(sortVersions(versions));
}