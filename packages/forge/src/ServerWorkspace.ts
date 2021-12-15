import os from 'os';
import download from 'download';
import { extractDownloadUrl } from './utils/links';
import { Logger } from './Logger';

const getRanaMC = () => `${os.homedir()}/.rana-mc/servers`;

export default class ServerWorkspace {

  public static TAG = "ServerWorkspace";
  public path: string;

  private logger: Logger = new Logger(ServerWorkspace.TAG);
  private ranaMcDir: string;

  constructor(server: Server) {
    this.ranaMcDir = getRanaMC();
    this.path = `${this.ranaMcDir}/${server.id}`

    console.log(this.path);
  }

  // TODO: maybe only ForgeCore?
  // TODO: or move workspace as @rana-mc/workspace
  async downloadCore(core: Core) {
    const downloadUrl = extractDownloadUrl(core.installerUrl);
    this.logger.log(`Downloading: ${downloadUrl}`);

    await download(downloadUrl, this.path);
    this.logger.log('Download done');
  }
}