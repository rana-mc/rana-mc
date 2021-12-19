/// <reference path="../types/index.d.ts" />

export enum ServerActions {
  InstallCore = "installCore",
  Start = "start",
  Stop = "stop",
  ExecCommand = "execCommand",
  RemoveCore = "removeCore",
  Clear = "clear",
  Eula = "eula"
}

export enum ServerStatus {
  Created = "created",
  CoreInstalling = "coreInstalling",
  CoreInstalled = "coreInstalled",
  Starting = "starting",
  Started = "started",
  Stopping = "stopping",
  Stopped = "stopped"
}

export enum ServerEvents {
  CoreInstalling = "coreInstalling",
  CoreInstalled = "coreInstalled",
  Starting = "starting",
  Started = "started",
  Stopping = "stopping",
  Stopped = "stopped",
  // TODO: Use when got crash in console output.
  Crashed = "crashed",
  Logs = "logs",
  EulaChanged = "eulaChanged",
}

export enum RanaSocketEvents {
  ServerUpdate = "serverUpdate",
}

export enum ServerCoreType {
  Forge = "forge",
  Fabric = "fabric"
}
