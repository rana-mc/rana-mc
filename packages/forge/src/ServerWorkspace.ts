import os from 'os';
import download from 'download';
import { ChildProcess } from 'child_process';
import { extractInstallerFilename, extractCoreFilename, extractDownloadUrl } from './utils/links';
import shell from 'shelljs';

type Executable = {
  filename: string;
  command: string;
  exec: () => ChildProcess;
  download?: () => Promise<void>;
  clear?: () => void;
}

export default class ServerWorkspace {

  public static TAG = "ServerWorkspace";
  private server: Server;

  constructor(server: Server) {
    this.server = server;
  }

  /**
   * Get installer for ForgeServer.
   */
  public getInstaller(): Executable {
    const filename = extractInstallerFilename(this.server.core.installerUrl);
    const command = `cd ${this.path} && java -jar ${filename} --installServer`;

    const exec = () => {
      return shell.exec(command, { silent: true, async: true });
    }

    const clear = () => {
      const clearInstallerCommand = `cd ${this.path} && rm ${filename}`;
      const clearInstallerLogCommand = `cd ${this.path} && rm ${filename}.log`;

      shell.exec(clearInstallerCommand, { async: true });
      shell.exec(clearInstallerLogCommand, { async: true });
    }

    const downloadInstaler = async () => {
      const downloadUrl = extractDownloadUrl(this.server.core.installerUrl);
      await download(downloadUrl, this.path);
    }

    return {
      filename,
      command,
      exec,
      clear,
      download: downloadInstaler
    }
  }

  /**
   * Get core for ForgeServer.
   */
  public getCore(): Executable {
    const filename = extractCoreFilename(this.server.core.installerUrl);
    const coreVersionInt = parseInt(this.server.core.coreVersion);

    const commandBefore37Version = `cd ${this.path} && java -jar ${filename} nogui`;
    const commandAfter37Version = `cd ${this.path} && ./run.sh nogui`;
    const command = coreVersionInt >= 37 ? commandAfter37Version : commandBefore37Version;

    const exec = () => {
      return shell.exec(command, { silent: true, async: true });
    }

    const clear = () => {
      const clearCoreCommand = `cd ${this.path} && rm ${filename}`;
      shell.exec(clearCoreCommand, { async: true });
    }

    return {
      filename,
      command,
      exec,
      clear
    };
  }

  /**
   * Accepting or not of Mojang EULA.
   */
  acceptEULA(accept: boolean): Promise<void> {
    const filename = 'eula.txt';
    const value = accept ? `eula=false/eula=true` : `eula=true/eula=false`;

    // TODO: Find better way to do this?
    const command = String.raw`cd ${this.path} && find ./ -type f -exec sed -i '' -e "s/${value}/" ${filename} \;`

    const exec = (): Promise<void> => {
      return new Promise((resolve) => {
        const process = shell.exec(command, { silent: true, async: true });

        process.on('exit', () => {
          resolve()
        });
      });
    };

    const eula = { filename, command, exec, };

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