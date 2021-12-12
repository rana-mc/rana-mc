declare type GameVersion = {
  type: number,
  versions: string[];
};

declare type VersionType = {
  id: number;
  gameId: number;
  name: string;
  slug: string;
}

declare type Core = {
  gameVersion: string;
  coreVersion: string;
  uploadTime: string;
  changelogUrl: string | null;
  installerUrl: string | null;
  mdkUrl: string | null;
};

declare type RanaDBData = {
  gameVersions: GameVersion[];
  versionTypes: VersionType[];
  cores: {
    [gameVersion: string]: Core[];
  }
};