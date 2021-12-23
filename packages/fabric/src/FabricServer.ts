import { ServerEvents } from '@rana-mc/types';
import { ChildProcess } from 'child_process';
import EventEmitter from 'events';
import { Logger } from './Logger';
import ServerWorkspace from './ServerWorkspace';

export class FabricServer extends EventEmitter {
  public static TAG = 'FabricServer';

  private logger: Logger = new Logger(FabricServer.TAG);

  private server: Server;

  private process: ChildProcess;

  private workspace: ServerWorkspace;

  constructor(server: Server) {
    super();

    this.server = server;
    this.workspace = new ServerWorkspace(server);
    this.logger = new Logger(this.getTag());
  }

  get id() {
    return this.server.id;
  }

  /**
   * Install server core.
   * Got only one step: download.
   */
  public async installCore() {
    this.emit(ServerEvents.CoreInstalling);

    const installer = this.workspace.getInstaller();
    this.logger.log(`Installing: ${installer.filename}`);

    await installer.download();
    this.logger.log('Downloading...');

    this.emit(ServerEvents.CoreInstalled);
  }

  /**
   * Start server with core.
   */
  public async start() {
    this.emit(ServerEvents.Starting);

    const core = this.workspace.getCore();
    this.logger.log(`Starting...: ${core.filename}`);

    const { command } = core;
    this.logger.log(`Start with: ${command}`);

    const process = core.exec();
    this.process = process;

    /** Little bit incorrect method to parse server start event. */
    process.stdout.on('data', (message) => {
      if (this.isServerStartedMessage(message)) {
        this.emit(ServerEvents.Started);
        this.emit(ServerEvents.StartTime, this.parseServerStartTime(message));
      }
    });

    process.stdout.on('data', (message) => {
      this.logger.log(`(ServerEvent): name = ${ServerEvents.Logs}, message = ${message}`);
      this.emit(ServerEvents.Logs, message);
    });

    process.on('exit', () => {
      this.logger.log(`(ServerEvent): name = ${ServerEvents.Stopped}`);
      this.emit(ServerEvents.Stopped);
    });
  }

  /**
   * Exec command on server.
   */
  public exec(command: string) {
    this.process.stdin.write(`${command}\n`);
    this.process.stdout.pipe(process.stdout);

    // TODO: Maybe event for command execution?
  }

  /**
   * Stop server.
   */
  public stop() {
    this.emit(ServerEvents.Stopping);

    this.process.stdin.write('stop\n');
    this.process.stdout.pipe(process.stdout);

    // TODO: Maybe event for stop server command execution?
  }

  /**
   * Remove server core.
   */
  public async removeCore() {
    const core = this.workspace.getCore();

    this.logger.log(`Removing...: ${core.filename}`);
    await core.clear();
  }

  /**
   * Remove server folder.
   */
  public async remove() {
    this.emit(ServerEvents.Removing);

    await this.workspace.clear();
    this.emit(ServerEvents.Removed);
  }

  /**
   * Update server data.
   */
  public update(server: Server): FabricServer {
    this.server = server;
    return this;
  }

  /**
   * Accepting or not of Mojang EULA.
   * Just replacing eula=accept_value in eula.txt.
   */
  public async acceptEULA(accept: boolean) {
    this.logger.log(`Accepting EULA...: ${accept}`);
    this.emit(ServerEvents.EulaChanged, accept);

    return this.workspace.acceptEULA(accept);
  }

  /**
   * Return all of ServerEvents values.
   */
  public eventNames(): (string | symbol)[] {
    return Object.values(ServerEvents);
  }

  /**
   * Return tag for logger. Like FabricServer-123;
   */
  public getTag() {
    return `${FabricServer.TAG}-${this.id}`;
  }

  /**
   * Well, just parse server starting event;
   */
  private isServerStartedMessage(message: string): boolean {
    return message.includes('For help, type "help"');
  }

  /**
     * Parse with regular server start time.
     */
  private parseServerStartTime(message: string): number {
    try {
      const startTime = message.match(/Done \((.+)s\)! For help, type "help"/);
      return parseFloat(startTime[1]);
    } catch (err) {
      return 0;
    }
  }
}
