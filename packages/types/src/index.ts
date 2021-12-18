/// <reference path="../types/index.d.ts" />

export enum ServerActions {
  InstallCore = "installCore",
  Start = "start",
  Stop = "stop",
  ExecCommand = "execCommand",
  RemoveCore = "removeCore",
  Clear = "clear",
}

export enum ServerCoreType {
  Forge = "forge",
  Fabric = "fabric"
}

export enum ServerEvents {
  CoreInstalled = "coreInstalled",
  Started = "started",
  Stopped = "stopped",
  Crashed = "crashed",
  Logs = "logs"
}
