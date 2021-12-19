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

declare type CoreType = 'forge' | 'fabric';
declare type Core = { type: CoreType } & ForgeCore | { type: CoreType } & FabricCore;

declare type Server = {
  id: string;
  name: string;
  status: string;
  core: Core;
  mods: ServerMod[];
  gameVersion: string;
  gameVersionTypeId: number;
  eula: boolean;
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
