import { JSONFile, Low } from 'lowdb';

export default class CurseForgeLocalDB {
  public static PATH = './curseforge.db.json';

  public static DEFAULTS: CurseForgeLocalDBData = {
    gameVersions: [],
    versionTypes: [],
  };

  private db: Low<CurseForgeLocalDBData>;

  constructor() {
    this.init();
  }

  async init() {
    const adapter = new JSONFile<CurseForgeLocalDBData>(CurseForgeLocalDB.PATH);
    const db = new Low<CurseForgeLocalDBData>(adapter);

    this.db = db;
    await this.db.read();

    this.db.data = this.db.data || CurseForgeLocalDB.DEFAULTS;
    await this.db.write();
  }

  getGameVersions() {
    return this.db.data.gameVersions;
  }

  async setGameVersions(gameVersions: GameVersion[]) {
    this.db.data.gameVersions = gameVersions;
    return this.db.write();
  }

  getVersionTypes() {
    return this.db.data.versionTypes;
  }

  async setVersionTypes(versionTypes: VersionType[]) {
    this.db.data.versionTypes = versionTypes;
    return this.db.write();
  }
}

export const curseForgeLocalDB = new CurseForgeLocalDB();
curseForgeLocalDB.init();
