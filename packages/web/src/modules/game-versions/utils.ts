export const sortVersions = (versions: string[]) =>
  versions.slice().sort((a, b) => parseInt(b) - parseInt(a));

export const filterVersions = (versions: string[]) => versions.filter((version) => !version.includes('Snapshot'));

export const formatVersions = (versions: string[]) => filterVersions(sortVersions(versions));
