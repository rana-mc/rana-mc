/// <reference path="../types/index.d.ts" />

export enum ServerEvents {
  CoreInstalled = "coreInstalled",
  Started = "started",
  Stopped = "stopped",
  Crashed = "crashed",
  Logs = "logs"
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
}

export enum ServerStatus {
  Created = "created",
  Installing = "installing",
  Starting = "starting",
  Stopping = "stopping"
}