import EventEmitter from "events";
import { Server as SocketIOServer } from 'socket.io'
import { Server as HTTPServer } from 'http'
import { Logger } from '../Logger';
import { FabricServer } from '@rana-mc/fabric';
import { ForgeServer } from '@rana-mc/forge';
import { RanaSocketEvents, ServerActions, ServerCoreType, ServerEvents, ServerStatus } from '@rana-mc/types';

type RanaServer = ForgeServer | FabricServer;

export default class RanaSocket extends EventEmitter {

  public static TAG = 'RanaSocket';

  // FYI: What will be better? Maybe { [serverId: string]:  RanaServer }?
  private servers: RanaServer[];

  // FYI: Better naming? serversData serverDatas?
  private data: Server[];

  private socket: SocketIOServer
  private logger: Logger;

  constructor(server: HTTPServer) {
    super();

    this.logger = new Logger(RanaSocket.TAG)
    this.socket = new SocketIOServer(server, {
      cors: { origin: "*" }
    });

    this.init();
  }

  private init = () => {
    this.socket.on('connection', client => {
      this.logger.log('Client connected');

      client.on(ServerActions.InstallCore, this.installServerCore.bind(this));
      client.on(ServerActions.Start, this.startServer.bind(this));
      client.on(ServerActions.ExecCommand, this.execServerCommand.bind(this));
      client.on(ServerActions.Stop, this.stopServer.bind(this));
      client.on(ServerActions.RemoveCore, this.removeCore.bind(this));
      client.on(ServerActions.Clear, this.clearServer.bind(this));
      client.on(ServerActions.Eula, this.acceptEULA.bind(this));

      client.on('disconnect', () => {
        this.logger.log('Client disconnected');
      });
    });
  }

  /**
   * Init this.servers and create listeners.
   */
  public initServers = (servers: Server[]) => {
    this.data = servers;

    this.servers = servers
      .map((server) => {
        // TODO: Make it by switch and case? Or function?
        if (server.core.type === ServerCoreType.Forge) {
          return new ForgeServer(server);
        }

        if (server.core.type === ServerCoreType.Fabric) {
          return new FabricServer(server);
        }

        // FYI: Strange case, cuz we always got correct server core type, right?
        return null;
      });

    this.servers.forEach(this.appendListeners.bind(this))
  }

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
  public clearServer(server: Server) {
    this.getServer(server).clear();
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
    return this.servers.find((_server: RanaServer) => {
      return _server.id === server.id;
    });
  }

  /**
   * Get data (Server) by .id of RanaServer.
   */
  private getServerData(server: RanaServer): Server {
    return this.data.find((_server: Server) => {
      return _server.id === server.id;
    });
  }

  /**
   * Just helper for send event of server status updates.
   */
  private updateServerStatus(server: RanaServer, status: ServerStatus) {
    this.emit(RanaSocketEvents.ServerUpdate, { ...this.getServerData(server), status });
    this.socket.emit(RanaSocketEvents.ServerUpdate, { ...this.getServerData(server), status });
  }

  /**
   * Just helper for send event of server eula updates.
   */
  private updateServerEULA(server: RanaServer, eula: boolean) {
    this.emit(RanaSocketEvents.ServerUpdate, { ...this.getServerData(server), eula });
    this.socket.emit(RanaSocketEvents.ServerUpdate, { ...this.getServerData(server), eula });
  }

  /**
   * Append listeners to RanaServer.
   * Events by ServerEvents.
   */
  private appendListeners(server: RanaServer) {

    /** Events for update server in RanaDB. */
    server.on(ServerEvents.CoreInstalled, () => this.updateServerStatus(server, ServerStatus.CoreInstalled));
    server.on(ServerEvents.Started, () => this.updateServerStatus(server, ServerStatus.Started));
    server.on(ServerEvents.Stopped, () => this.updateServerStatus(server, ServerStatus.Stopped));
    server.on(ServerEvents.Crashed, () => this.updateServerStatus(server, ServerStatus.Stopped));
    server.on(ServerEvents.EulaChanged, (eula) => this.updateServerEULA(server, eula));

    /** Events for sending info to socket clients. Like logs. */
    server.on(ServerEvents.Logs, (message) => this.socket.emit(ServerEvents.Logs, server.id, message));
  }
}
