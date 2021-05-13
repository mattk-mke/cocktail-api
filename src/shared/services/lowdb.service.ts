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

    /**
     * Initializes the local JSON database
     * Sets default values on first run
     */
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

    /**
     * Retrieves an item from the database
     */
    public getItem<T>(collection: string, id: string): T {
        return (
            this.db
                .get(collection)
                // @ts-ignore
                .find({ id })
                .value()
        );
    }

    /**
     * Retrieves an entire collection from the database
     */
    public getCollection<T>(collection: string): T[] {
        return this.db.get(collection).value();
    }

    /**
     * Adds an item to a collection in the database
     */
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

    /**
     * Removes an item from a collection in the database that matches the specified ID
     */
    public removeFromCollection(collection: string, id: string) {
        this.db
            .get(collection)
            // @ts-ignore
            .remove({ id })
            .write();
        this.db.update("counts." + collection, n => n - 1).write();
    }

    /**
     * Updates an item in the database, given the ID
     */
    public updateItemInCollection<T>(collection: string, item: T) {
        const newItem: T = {
            ...item,
            dateModified: new Date().toISOString()
        };
        this.db
            .get(collection)
            // @ts-ignore
            .find({ id: item.id })
            .assign(newItem)
            .write();
        return newItem;
    }
}
