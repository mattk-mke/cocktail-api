import Lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { LowDBService } from "../../src/shared/services/lowdb.service";

export class LowDBServiceStub extends LowDBService {
    public init() {
        this.adapter = new FileSync("lowdb.test.json");
        this.db = Lowdb(this.adapter);
        this.db
            .set("cocktails", [])
            .set("ingredients", [])
            .set("counts", {
                ingredients: 0,
                cocktails: 0
            })
            .write();
    }
}
