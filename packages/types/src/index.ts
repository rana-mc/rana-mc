/// <reference path="../types/index.d.ts" />

export enum ServerActions {
  InstallCore = 'installCore',
  Start = 'start',
  Stop = 'stop',
  ExecCommand = 'execCommand',
  RemoveCore = 'removeCore',
  Clear = 'clear',
  Eula = 'eula',
  FlushServers = 'flushServers',
  RemoveServer = 'removeServer',
}

export enum ServerStatus {
  Created = 'created',
  CoreInstalling = 'coreInstalling',
  CoreInstalled = 'coreInstalled',
  Starting = 'starting',
  Started = 'started',
  Stopping = 'stopping',
  Stopped = 'stopped',
  Removing = 'removing',
}

export enum ServerEvents {
  CoreInstalling = 'coreInstalling',
  CoreInstalled = 'coreInstalled',
  Starting = 'starting',
  Started = 'started',
  Stopping = 'stopping',
  Stopped = 'stopped',
  // TODO: Use when got crash in console output.
  Crashed = 'crashed',
  Logs = 'logs',
  EulaChanged = 'eulaChanged',
  StartTime = 'startTime',
  Removing = 'removing',
  Removed = 'removed',
}

export enum RanaSocketEvents {
  ServerUpdate = 'serverUpdate',
  ClientServerUpdate = 'clientServerUpdate',
  ServersFlush = 'serversFlush',
  SocketServersFlush = 'socketServersFlush',
}

export enum ServerCoreType {
  Forge = 'forge',
  Fabric = 'fabric',
}
