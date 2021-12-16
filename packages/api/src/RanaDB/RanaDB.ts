import { JSONFile, Low } from "lowdb";

type SettingsHandler = (settings: Settings) => void

export default class RanaDB {
    public static DB_PATH = './db.json';
    public static DB_DEFAULT: RanaDBData = { servers: [], settings: {} };

    private db: Low<RanaDBData>;
    private settingsHandler: SettingsHandler;

    constructor() { }

    async init() {
        const adapter = new JSONFile<RanaDBData>(RanaDB.DB_PATH);
        const db = new Low<RanaDBData>(adapter)

        this.db = db;
        await db.read();

        this.db.data = this.db.data || RanaDB.DB_DEFAULT;
        await this.db.write();
    }

    getServers() {
        return this.db.data.servers || [];
    }

    async addServer(server: Server) {
        this.db.data.servers.push(server);
        return await this.db.write();
    }

    getSettings() {
        return this.db.data.settings;
    }

    async setSettings(settings: Partial<Settings>) {
        this.db.data.settings = {
            ...this.db.data.settings,
            ...settings
        };

        this.settingsHandler && this.settingsHandler(settings);

        return await this.db.write();
    }

    async removeServer(serverId: string) {
        this.db.data.servers =
            this.db.data.servers.filter(server => server.id !== serverId);

        return await this.db.write();
    }

    async findServer(serverId: string) {
        return this.db.data.servers.find(server => server.id === serverId);
    }

    setSettingsHandler(handler: SettingsHandler) {
        this.settingsHandler = handler;
    };
}

export const ranaDB = new RanaDB();
await ranaDB.init();
