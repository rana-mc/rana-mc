import { JSONFile, Low } from "lowdb";

type GameVersion = {
    name: string;
    gameTypeId: string;
};

type RanaDBData = {
    gameVersions: GameVersion[];
}

export default class RanaDB {
    public static DB_PATH = './storage/db.json';
    public static DB_DEFAULT: RanaDBData =
        {
            gameVersions: []
        };

    private db: Low<RanaDBData>;

    constructor() {
        this.init();
    }

    async init() {
        const adapter = new JSONFile<RanaDBData>(RanaDB.DB_PATH);
        const db = new Low<RanaDBData>(adapter)

        this.db = db;
        await db.read();

        this.db.data = this.db.data || RanaDB.DB_DEFAULT;
        await this.db.write();
    }
}

new RanaDB();