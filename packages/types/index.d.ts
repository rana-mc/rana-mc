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

declare type FabricCore = {
  coreVersion: string;
  installerUrl: string | null;
};

declare type Server = {
  id: string;
  name: string;
  gameVersion: string;
  coreVersion: string;
  installerUrl: string | null;
  mods: ServerMod[];
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

declare type CoreTypeForge = 'forge';
declare type CoreTypeFabric = 'fabric';
declare type CoreType = CoreTypeForge | CoreTypeFabric;