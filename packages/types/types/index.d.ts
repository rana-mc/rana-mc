declare type GameVersion = {
  type: number;
  versions: string[];
};

declare type VersionType = {
  id: number;
  gameId: number;
  name: string;
  slug: string;
};

declare type ForgeCore = {
  gameVersion: string;
  coreVersion: string;
  uploadTime: string;
  changelogUrl: string | null;
  installerUrl: string | null;
  mdkUrl: string | null;
};

declare type ExternalForgeCoreUrl = {
  url: string;
  name: string;
};

declare type FabricInstaller = {
  url: string;
  maven: string;
  version: string;
  stable: boolean;
};

declare type FabricLoader = {
  url: string;
  maven: string;
  version: string;
  stable: boolean;
};

declare type FabricCore = {
  gameVersion: '*';
  coreVersion: string;
  installerUrl: string | null;
  maven: string;
  stable: boolean;
};

declare type ServerCoreTypeValues = 'forge' | 'fabric';
declare type ServerCore =
  | ({ type: ServerCoreTypeValues } & ForgeCore)
  | ({ type: ServerCoreTypeValues } & FabricCore);

declare type Server = {
  id: string;
  name: string;
  status: string;
  core: ServerCore;
  mods: ServerMod[];
  gameVersion: string;
  gameVersionTypeId: number;
  eula: boolean;
  startTimes: [];
};

// TODO: what is it? links? file/names? mb
declare type ServerMod = string;

declare type Settings = {
  curseApiKey?: string;
};

declare type RanaDBData = {
  servers: Server[];
  settings: Settings;
};

declare type OutputHandler = (message: string) => void;
