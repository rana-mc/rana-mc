/// <reference path="../types/index.d.ts" />
import { JSONFile, Low } from "lowdb";

export default class RanaDB {
    public static DB_PATH = './db.json';
    public static DB_DEFAULT: RanaDBData =
        {
            gameVersions: [],
            versionTypes: [],
            cores: {},
            servers: []
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

    getForgeCores(version: string) {
        if (this.data().cores[version]) {
            return this.data().cores[version].forge || [];
        }
        return [];
    }

    async setForgeCores(version: string, cores: ForgeCore[]) {
        this.data().cores[version] = {
            ...this.data().cores[version],
            forge: cores
        };
        return await this.write();
    }

    getFabricCores(version: string) {
        if (this.data().cores[version]) {
            return this.data().cores[version].forge || [];
        }
        return [];
    }

    async setFabricCores(version: string, cores: FabricCore[]) {
        this.data().cores[version] = {
            ...this.data().cores[version],
            fabric: cores
        };
        return await this.write();
    }

    getServers() {
        return this.data().servers || [];
    }

    async addServer(server: Server) {
        this.data().servers.push(server);
        return await this.write();
    }

    getSettings() {
        return this.data().settings || {};
    }

    async setSettings(settings: Partial<Settings>) {
        this.data().settings = {
            ...this.data().settings,
            ...settings
        };
        return await this.write();
    }
}

export const db = new RanaDB();
