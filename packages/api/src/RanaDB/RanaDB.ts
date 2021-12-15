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

    data(): RanaDBData {
        return this.db.data;
    }

    async write() {
        return this.db.write();
    }

    async read() {
        return this.db.read();
    }

    getServers() {
        return this.data().servers || [];
    }

    async addServer(server: Server) {
        this.data().servers.push(server);
        return await this.write();
    }

    getSettings() {
        return this.data().settings;
    }

    async setSettings(settings: Partial<Settings>) {
        this.data().settings = {
            ...this.data().settings,
            ...settings
        };

        this.settingsHandler && this.settingsHandler(settings);

        return await this.write();
    }

    setSettingsHandler(handler: SettingsHandler) {
        this.settingsHandler = handler;
    };
}

export const ranaDB = new RanaDB();
await ranaDB.init();
