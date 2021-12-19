/// <reference path="../types/index.d.ts" />

export enum ServerEvents {
  CoreInstalled = "coreInstalled",
  Started = "started",
  Stopped = "stopped",
  Crashed = "crashed",
  Logs = "logs",
  EulaChanged = "eulaChanged",
}

export enum ServerCoreType {
  Forge = "forge",
  Fabric = "fabric"
}

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
  Installing = "installing",
  CoreInstalled = "coreInstalled",
  Starting = "starting",
  Started = "started",
  Stopping = "stopping",
  Stopped = "stopped"
}

export enum RanaSocketEvents {
  ServerUpdate = "serverUpdate",
}
