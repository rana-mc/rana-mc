import { JSONFile, Low } from 'lowdb';

export default class FabricLocalDB {
  public static PATH = './fabric.db.json';

  public static DEFAULTS: FabricLocalDBData = {
    installers: null,
    loaders: null,
    status: {},
  };

  private db: Low<FabricLocalDBData>;

  constructor() {
    this.init();
  }

  async init() {
    const adapter = new JSONFile<FabricLocalDBData>(FabricLocalDB.PATH);
    const db = new Low<FabricLocalDBData>(adapter);

    this.db = db;
    await this.db.read();

    this.db.data = this.db.data || FabricLocalDB.DEFAULTS;
    await this.db.write();
  }

  getFabricInstallers(): FabricInstaller[] | null {
    return this.db.data.installers || null;
  }

  async setFabricInstallers(installers: FabricInstaller[]) {
    this.db.data.installers = installers;
    return this.db.write();
  }

  getFabricLoaders(): FabricLoader[] | null {
    return this.db.data.loaders || null;
  }

  async setFabricLoaders(loaders: FabricLoader[]) {
    this.db.data.loaders = loaders;
    return this.db.write();
  }

  getCoreStatus(coreName: string): number | null {
    return this.db.data.status[coreName] || null;
  }

  async setCoreStatus(coreName: string, status: number) {
    this.db.data.status[coreName] = status;
    return this.db.write();
  }

  findInstallerByVersion(installerVersion: string) {
    return this.db.data.installers.find(
      (installer) => installer.version === installerVersion
    );
  }

  findLoaderByVersion(loaderVersion: string) {
    return this.db.data.loaders.find((loader) => loader.version === loaderVersion);
  }
}

export const fabricLocalDB = new FabricLocalDB();
fabricLocalDB.init();
