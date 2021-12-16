import os from 'os';
import download from 'download';
import { extractCoreFilename, extractDownloadUrl } from './utils/links';
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

  async downloadCore(core: Core) {
    const downloadUrl = extractDownloadUrl(core.installerUrl);
    this.logger.log(`Downloading: ${downloadUrl}`);

    await download(downloadUrl, this.path);
    this.logger.log('Download done');
  }

  async installCore(core: Core) {
    const coreFilename = extractCoreFilename(core.installerUrl);
    this.logger.log(`Installing: ${coreFilename}`);

    const installCommand = `cd ${this.path} && java -jar ${coreFilename} --installServer`;
    this.logger.log(`Install with: ${installCommand}`);

    const installer = shell.exec(installCommand, { async: true });

    installer.stdout.on(installCommand, (data) => {
      this.logger.log(data);
      this.outputHandler && this.outputHandler(data);
    });

    installer.on('exit', () => {
      this.logger.log('Install done');
      this.clearInstaller(core);
    });
  }

  async clearInstaller(core: Core) {
    const coreFilename = extractCoreFilename(core.installerUrl);
    const clearInstallerCommand = `cd ${this.path} && rm ${coreFilename}`;
    const clearInstallerLogCommand = `cd ${this.path} && rm ${coreFilename}.log`;

    shell.exec(clearInstallerCommand, { async: true });
    shell.exec(clearInstallerLogCommand, { async: true });
  }
}