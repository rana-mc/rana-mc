/// <reference path="../types/index.d.ts" />
import { JSONFile, Low } from "lowdb";

export default class RanaDB {
    public static DB_PATH = './storage/db.json';
    public static DB_DEFAULT: RanaDBData =
        {
            gameVersions: []
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

    async data() {
        return this.db.data;
    }
}
