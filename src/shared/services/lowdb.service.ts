import Lowdb, { AdapterSync, LowdbSync } from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { nanoid } from "nanoid";
import { IDBSchema } from "../interfaces/lowdb.interface";

export class LowDBService {
    public adapter!: AdapterSync<IDBSchema>;
    public db!: LowdbSync<IDBSchema>;

    constructor() {
        this.init();
    }

    public init() {
        this.adapter = new FileSync("lowdb.json");
        this.db = Lowdb(this.adapter);
        this.db
            .defaults<IDBSchema>({
                cocktails: [],
                ingredients: [],
                counts: { cocktails: 0, ingredients: 0 }
            })
            .write();
    }

    public getCollection<T>(collection: string): T[] {
        return this.db.get(collection).value();
    }

    public addToCollection<T>(collection: string, item: T) {
        const newItem = { ...item, id: nanoid(), dateModified: new Date().toISOString() };
        this.db
            .get(collection)
            // @ts-ignore
            .push(newItem)
            .write();
        this.db.update("counts." + collection, n => n + 1).write();
        return newItem;
    }

    public removeFromCollection(collection: string, id: string) {
        this.db
            .get(collection)
            // @ts-ignore
            .remove({ id })
            .write();
        this.db.update("counts." + collection, n => n - 1).write();
    }
}
