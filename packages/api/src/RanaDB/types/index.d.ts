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