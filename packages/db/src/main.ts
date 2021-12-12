/// <reference path="../types/index.d.ts" />
import { JSONFile, Low } from "lowdb";

export default class RanaDB {
    public static DB_PATH = './db.json';
    public static DB_DEFAULT: RanaDBData =
        {
            gameVersions: [],
            versionTypes: [],
            cores: {}
        };

    private db: Low<RanaDBData>;

    constructor() { }

    async init() {
        const adapter = new JSONFile<RanaDBData>(RanaDB.DB_PATH);
        const db = new Low<RanaDBData>(adapter)

        this.db = db;
        await db.read();

        this.db.data = this.db.data || RanaDB.DB_DEFAULT;
        await this.db.write();
    }

    data(): RanaDBData {
        return this.db.data;
    }

    async write() {
        return this.db.write();
    }

    async read() {
        return this.db.read();
    }

    getVersionTypes() {
        return this.data().versionTypes;
    }

    async setVersionTypes(versionTypes: VersionType[]) {
        this.data().versionTypes = versionTypes;
        return await this.write();
    }

    // TODO: get by version type?
    getGameVersions() {
        return this.data().gameVersions;
    }

    async setGameVersions(gameVersions: GameVersion[]) {
        this.data().gameVersions = gameVersions;
        return await this.write();
    }

    getCores(version: string) {
        return this.data().cores[version] || [];
    }

    async setCores(version: string, cores: Core[]) {
        this.data().cores[version] = cores;
        return await this.write();
    }
}

export const db = new RanaDB();
