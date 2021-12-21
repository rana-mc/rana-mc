import EventEmitter from 'events';
import { Server as SocketIOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { FabricServer } from '@rana-mc/fabric';
import { ForgeServer } from '@rana-mc/forge';
import {
  RanaSocketEvents,
  ServerActions,
  ServerCoreType,
  ServerEvents,
  ServerStatus,
} from '@rana-mc/types';
import { Logger } from '../Logger';

type RanaServer = ForgeServer | FabricServer;

export default class RanaSocket extends EventEmitter {
  public static TAG = 'RanaSocket';

  // FYI: What will be better? Maybe { [serverId: string]:  RanaServer }?
  private servers: RanaServer[];

  // FYI: Better naming? serversData serverDatas?
  private data: Server[];

  private socket: SocketIOServer;

  private logger: Logger;

  constructor(server: HTTPServer) {
    super();

    this.logger = new Logger(RanaSocket.TAG);
    this.socket = new SocketIOServer(server, {
      cors: { origin: '*' },
    });

    this.init();
  }

  private init = () => {
    /** Socket client actions. */
    this.socket.on('connection', (client) => {
      this.logger.log('Client connected');

      client.on(ServerActions.InstallCore, this.installServerCore.bind(this));
      client.on(ServerActions.Start, this.startServer.bind(this));
      client.on(ServerActions.ExecCommand, this.execServerCommand.bind(this));
      client.on(ServerActions.Stop, this.stopServer.bind(this));
      client.on(ServerActions.RemoveCore, this.removeCore.bind(this));
      client.on(ServerActions.Eula, this.acceptEULA.bind(this));
      client.on(ServerActions.FlushServers, this.flushServers.bind(this));
      client.on(ServerActions.RemoveServer, this.removeServer.bind(this));

      client.on('disconnect', () => {
        this.logger.log('Client disconnected');
      });
    });

    /** Utility actions. */
    this.on(RanaSocketEvents.ClientServerUpdate, this.onClientServerUpdate.bind(this));
    this.on(RanaSocketEvents.SocketServersFlush, this.onSocketServersFlush.bind(this));
  };

  /**
   * Init this.servers and create listeners.
   */
  public initServers = (servers: Server[]) => {
    this.data = servers;
    this.servers = servers.map(this.createServer.bind(this));
  };

  /**
   * At first, we should to install server core.
   */
  public installServerCore(server: Server) {
    this.getServer(server).installCore();
  }

  /**
   * Well, now – good moment for try to start server.
   */
  public startServer(server: Server) {
    this.getServer(server).start();
  }

  /**
   * Ho-ho, wanna be admin?
   */
  public execServerCommand(server: Server, command: string) {
    this.getServer(server).exec(command);
  }

  /**
   * Good time ends. Bad too.
   */
  public stopServer(server: Server) {
    this.getServer(server).stop();
  }

  /**
   * Bye-bye old core. At now we can replace by new?
   */
  public removeCore(server: Server) {
    this.getServer(server).removeCore();
  }

  /**
   * Just remove server.
   */
  private removeServer(server: Server) {
    this.getServer(server).remove();
  }

  /**
   * Accepting EULA of Mojang.
   */
  public acceptEULA(server: Server, accept: boolean) {
    this.getServer(server).acceptEULA(accept);
  }

  /**
   * Get RanaServer by .id of Server.
   */
  private getServer(server: Server): RanaServer {
    return this.servers.find((_server: RanaServer) => _server.id === server.id);
  }

  /**
   * Get data (Server) by .id of RanaServer.
   */
  private getServerData(server: RanaServer): Server {
    return this.data.find((_server: Server) => _server.id === server.id);
  }

  /**
   * Sending updated server from ranaDB to socket clients.
   */
  private onClientServerUpdate(server: Server) {
    this.socket.emit(RanaSocketEvents.ServerUpdate, server);
  }

  /**
   * Flush new or updated servers at this.servers and this.data.
   */
  private onSocketServersFlush(servers: Server[]) {
    this.data = servers;
    this.servers = servers.map((_server) => {
      const ranaServer = this.servers.find(
        (_ranaServer) => _ranaServer.id === _server.id
      );
      return ranaServer ? ranaServer.update(_server) : this.createServer(_server);
    });
  }

  private flushServers() {
    this.emit(RanaSocketEvents.ServersFlush);
  }

  /**
   * Just helper for send event of server status updates.
   */
  private updateServerStatus(server: RanaServer, status: ServerStatus) {
    const update = { id: this.getServerData(server).id, status };
    this.emit(RanaSocketEvents.ServerUpdate, update);
  }

  /**
   * Just helper for send event of server eula updates.
   */
  private updateServerEULA(server: RanaServer, eula: boolean) {
    const update = { id: this.getServerData(server).id, eula };
    this.emit(RanaSocketEvents.ServerUpdate, update);
  }

  /**
   * Just helper for send event of server startTimes updates.
   */
  private updateServerStartTimes(server: RanaServer, startTime: boolean) {
    const data = this.getServerData(server);
    const update = {
      id: data.id,
      startTimes: [...(data.startTimes || []), startTime],
    };

    this.emit(RanaSocketEvents.ServerUpdate, update);
  }

  /**
   * Append listeners to RanaServer.
   * Events by ServerEvents.
   */
  private appendListeners(server: RanaServer) {
    /** Events for update server in RanaDB. */
    server.on(ServerEvents.CoreInstalling, () =>
      this.updateServerStatus(server, ServerStatus.CoreInstalling));
    server.on(ServerEvents.CoreInstalled, () =>
      this.updateServerStatus(server, ServerStatus.CoreInstalled));
    server.on(ServerEvents.Starting, () =>
      this.updateServerStatus(server, ServerStatus.Starting));
    server.on(ServerEvents.Started, () =>
      this.updateServerStatus(server, ServerStatus.Started));
    server.on(ServerEvents.Stopping, () =>
      this.updateServerStatus(server, ServerStatus.Stopping));
    server.on(ServerEvents.Stopped, () =>
      this.updateServerStatus(server, ServerStatus.Stopped));
    server.on(ServerEvents.Removing, () =>
      this.updateServerStatus(server, ServerStatus.Removing));

    /** Utility events. */
    server.on(ServerEvents.Crashed, () =>
      this.updateServerStatus(server, ServerStatus.Stopped));
    server.on(ServerEvents.StartTime, (startTime) =>
      this.updateServerStartTimes(server, startTime));
    server.on(ServerEvents.EulaChanged, (eula) => this.updateServerEULA(server, eula));
    server.on(ServerEvents.Removed, () => this.removeServerInstance(server));

    /** Events for sending info to socket clients. Like logs. */
    server.on(ServerEvents.Logs, (message) =>
      this.socket.emit(ServerEvents.Logs, server.id, message));
  }

  /**
   * Create server by core type.
   * Return ForgeServer, FabricServer, etc.
   */
  private createServer(server: Server) {
    // eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention
    let _server = null;

    // TODO: Make it by switch and case? Or function?
    if (server.core.type === ServerCoreType.Forge) {
      _server = new ForgeServer(server);
    }

    if (server.core.type === ServerCoreType.Fabric) {
      _server = new FabricServer(server);
    }

    // FYI: Strange case, cuz we always got correct server core type, right?
    if (_server) this.appendListeners(_server);

    return _server;
  }

  /**
   * Remove server instance from this.servers after workspace.clear().
   */
  private removeServerInstance(server: RanaServer) {
    this.servers = this.servers.filter((_server) => _server.id !== server.id);
    this.flushServers();
  }
}
