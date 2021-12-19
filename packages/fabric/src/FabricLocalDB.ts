import { JSONFile, Low } from "lowdb";

export default class FabricLocalDB {
    public static PATH = './fabric.db.json';
    public static DEFAULTS: FabricLocalDBData = { cores: null };

    private db: Low<FabricLocalDBData>;

    constructor() {
        this.init();
    }

    async init() {
        const adapter = new JSONFile<FabricLocalDBData>(FabricLocalDB.PATH);
        const db = new Low<FabricLocalDBData>(adapter)

        this.db = db;
        await this.db.read();

        this.db.data = this.db.data || FabricLocalDB.DEFAULTS;
        await this.db.write();
    }

    getFabricCores(): FabricCore[] | null {
        return this.db.data.cores || null;
    }

    async setFabricCores(cores: FabricCore[]) {
        this.db.data.cores = cores;
        return await this.db.write();
    }
}

export const fabricLocalDB = new FabricLocalDB();
fabricLocalDB.init();
