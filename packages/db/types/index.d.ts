declare type GameVersion = {
  name: string;
  gameTypeId: string;
};

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
  cores: {
    [gameVersion: string]: Core[];
  }
};