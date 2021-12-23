import os from 'os';
import download from 'download';
import { ChildProcess } from 'child_process';
import shell from 'shelljs';
import { getCoreFilename, getInstallerFilename } from './utils/server';

type Executable = {
  filename: string;
  command?: string;
  exec?: () => ChildProcess;
  download?: () => Promise<void>;
  clear?: () => void;
};

export default class ServerWorkspace {
  public static TAG = 'ServerWorkspace';

  private server: Server<FabricServerCore>;

  constructor(server: Server) {
    this.server = server as Server<FabricServerCore>;
  }

  /**
   * Get installer for FabricServer.
   */
  public getInstaller(): Executable {
    const filename = getInstallerFilename(this.server.core);

    const downloadInstaler = async () => {
      const downloadUrl = this.server.core.serverInstallerUrl;
      await download(downloadUrl, this.path, { filename });
    };

    return {
      filename,
      download: downloadInstaler,
    };
  }

  /**
   * Get core for FabricServer.
   */
  public getCore(): Executable {
    const filename = getCoreFilename(this.server.core);
    const command = `cd ${this.path} && java -jar ${filename} nogui`;

    const exec = () => shell.exec(command, { silent: true, async: true });

    const clear = () => {
      const clearCoreCommand = `cd ${this.path} && rm ${filename}`;
      shell.exec(clearCoreCommand, { async: true });
    };

    return {
      filename,
      command,
      exec,
      clear,
    };
  }

  /**
   * Accepting or not of Mojang EULA.
   */
  acceptEULA(accept: boolean): Promise<void> {
    const filename = 'eula.txt';
    const value = accept ? 'eula=false/eula=true' : 'eula=true/eula=false';

    // TODO: Find better way to do this?
    /* eslint-disable max-len */
    const cd = `cd ${this.path}`;
    const find = String.raw`find ./ -type f -exec sed -i '' -e "s/${value}/" ${filename} \;`;
    const command = `${cd} && ${find}`;
    /* eslint-enable max-len */

    const exec = (): Promise<void> =>
      new Promise((resolve) => {
        const process = shell.exec(command, { silent: true, async: true });

        process.on('exit', () => {
          resolve();
        });
      });

    const eula = { filename, command, exec };

    return eula.exec();
  }

  /**
   * Clear folder with server.
   */
  clear(): Promise<void> {
    return new Promise((resolve) => {
      const command = `rm -rf ${this.path}`;
      const process = shell.exec(command, { async: true });

      process.on('exit', () => resolve());
    });
  }

  /**
   * Get server path.
   */
  public get path() {
    return `${this.ranaHome}/${this.server.id}`;
  }

  /**
   * RanaMC home folder.
   * Usualy is .rana-mc at user home dir.
   */
  private get ranaHome() {
    return `${os.homedir()}/.rana-mc/servers`;
  }
}
