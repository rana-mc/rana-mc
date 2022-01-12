import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3001';
export const ranaSocket = io(SOCKET_URL);

// TODO: Use from @rana-mc/types
export enum ServerActions {
  InstallCore = "installCore",
  Start = "start",
  Stop = "stop",
  ExecCommand = "execCommand",
  RemoveCore = "removeCore",
  Clear = "clear",
  Eula = "eula",
  FlushServers = "flushServers",
  RemoveServer = "removeServer"
}

// TODO: Use from @rana-mc/types
export enum ServerStatus {
  Created = "created",
  CoreInstalling = "coreInstalling",
  CoreInstalled = "coreInstalled",
  Starting = "starting",
  Started = "started",
  Stopping = "stopping",
  Stopped = "stopped",
  Removing = "removing"
}