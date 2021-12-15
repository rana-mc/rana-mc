import { JSONFile, Low } from "lowdb";

export default class ForgeLocalDB {
    public static PATH = './forge.db.json';
    public static DEFAULTS: ForgeLocalDBData = { cores: {} };

    private db: Low<ForgeLocalDBData>;

    constructor() {
        this.init();
    }

    async init() {
        const adapter = new JSONFile<ForgeLocalDBData>(ForgeLocalDB.PATH);
        const db = new Low<ForgeLocalDBData>(adapter)

        this.db = db;
        await this.db.read();

        this.db.data = this.db.data || ForgeLocalDB.DEFAULTS;
        await this.db.write();
    }

    getForgeCores(version: string): ForgeCore[] | null {
        if (this.db.data.cores[version])
            return this.db.data.cores[version] || null;
        return null;
    }

    async setForgeCores(version: string, cores: ForgeCore[]) {
        this.db.data.cores[version] = cores;
        return await this.db.write();
    }
}

export const forgeLocalDB = new ForgeLocalDB();
forgeLocalDB.init();
