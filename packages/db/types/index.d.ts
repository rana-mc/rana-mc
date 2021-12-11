declare type GameVersion = {
  name: string;
  gameTypeId: string;
};

declare type RanaDBData = {
  gameVersions: GameVersion[];
};