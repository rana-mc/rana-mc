import os from 'os';
import download from 'download';
import { extractInstallerFilename, extractCoreFilename, extractDownloadUrl } from './utils/links';
import { Logger } from './Logger';
import shell from 'shelljs';

const getRanaMC = () => `${os.homedir()}/.rana-mc/servers`;

// TODO: maybe only ForgeCore?
// TODO: or move workspace as @rana-mc/workspace
export default class ServerWorkspace {

  public static TAG = "ServerWorkspace";
  public path: string;

  private outputHandler: OutputHandler;
  private logger: Logger = new Logger(ServerWorkspace.TAG);
  private ranaMcDir: string;

  constructor(server: Server, outputHandler?: OutputHandler) {
    this.outputHandler = outputHandler;
    this.ranaMcDir = getRanaMC();
    this.path = `${this.ranaMcDir}/${server.id}`
  }

  async startCore(core: Core) {
    const coreFilename = extractCoreFilename(core.installerUrl);
    this.logger.log(`Starting...: ${coreFilename}`);

    // TODO: how it makes beeter
    let startCommand = `cd ${this.path} && java -jar ${coreFilename} nogui`;
    if (parseInt(core.coreVersion) >= 37) {
      startCommand = `cd ${this.path} && ./run.sh`;
    }

    this.logger.log(`Start with: ${startCommand}`);
    const starter = shell.exec(startCommand, { silent: true, async: true });

    starter.stdout.on('data', (data) => {
      this.outputHandler && this.outputHandler(data);
    });

    starter.on('exit', () => {
      this.logger.log('Server stoped');
    });
  }

  async downloadCore(core: Core) {
    const downloadUrl = extractDownloadUrl(core.installerUrl);
    this.logger.log(`Downloading: ${downloadUrl}`);

    await download(downloadUrl, this.path);
    this.logger.log('Download done');
  }

  async installCore(core: Core) {
    const installerFilename = extractInstallerFilename(core.installerUrl);
    this.logger.log(`Installing: ${installerFilename}`);

    const installCommand = `cd ${this.path} && java -jar ${installerFilename} --installServer`;
    this.logger.log(`Install with: ${installCommand}`);

    const installer = shell.exec(installCommand, { silent: true, async: true });

    installer.stdout.on('data', (data) => {
      this.outputHandler && this.outputHandler(data);
    });

    installer.on('exit', () => {
      this.logger.log('Install done');
      this.clearInstaller(core);
    });

    return installer;
  }

  private async clearInstaller(core: Core) {
    const coreFilename = extractCoreFilename(core.installerUrl);
    const clearInstallerCommand = `cd ${this.path} && rm ${coreFilename}`;
    const clearInstallerLogCommand = `cd ${this.path} && rm ${coreFilename}.log`;

    shell.exec(clearInstallerCommand, { async: true });
    shell.exec(clearInstallerLogCommand, { async: true });
  }

  async clear() {
    const clearCommand = `rm -rf ${this.path}`;
    shell.exec(clearCommand, { async: true });
  }
}