import { Server as SocketIOServer } from 'socket.io'
import { Server as HTTPServer } from 'http'
import { Logger } from '../Logger';
import { FabricServer } from '@rana-mc/fabric';
import { ForgeServer } from '@rana-mc/forge';
import { ServerActions, ServerCoreType } from '@rana-mc/types';

type RanaServer = ForgeServer | FabricServer;

export default class RanaSocket {

  public static TAG = 'RanaSocket';

  socket: SocketIOServer
  // FYI: What will be better? Maybe { [serverId: string]:  RanaServer }?
  servers: RanaServer[];
  logger: Logger;

  constructor(server: HTTPServer) {
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

      client.on('disconnect', () => {
        this.logger.log('Client disconnected');
      });
    });
  }

  /**
   * Init this.servers and create listeners.
   */
  public initServers = (servers: Server[]) => {
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
      })
      .map((server: RanaServer) => this.appendListeners(server));
  }

  /**
   * At first, we should to install server core.
   */
  public installServerCore(server: Server) {
    this.logger.log('Call installServerCore()');
    this.getServer(server).installCore();
  }

  /**
   * Well, now – good moment for try to start server.
   */
  public startServer(server: Server) {
    this.logger.log('Call startServer()');
    this.getServer(server).start();
  }

  /**
   * Ho-ho, wanna be admin?
   */
  public execServerCommand(server: Server, command: string) {
    this.logger.log('Call execServerCommand()');
    this.getServer(server).exec(command);
  }

  /**
   * Good time ends. Bad too.
   */
  public stopServer(server: Server) {
    this.logger.log('Call stopServer()');
    this.getServer(server).stop();
  }

  /**
   * Bye-bye old core. At now we can replace by new?
   */
  public removeCore(server: Server) {
    this.logger.log('Call removeCore()');
    this.getServer(server).removeCore();
  }

  /**
   * Just remove server.
   */
  public clearServer(server: Server) {
    this.logger.log('Call clearServer()');
    this.getServer(server).clear();
  }

  private getServer(server: Server): RanaServer {
    return this.servers.find((_server: RanaServer) => {
      return _server.id === server.id;
    });
  }

  private appendListeners(server: RanaServer) {
    this.logger.log('Call appendListeners()');

    server.eventNames().forEach((eventName) => {
      // TODO: In future, maybe we should send event data too?
      this.socket.emit(eventName.toString());
    });

    return server;
  }
}
