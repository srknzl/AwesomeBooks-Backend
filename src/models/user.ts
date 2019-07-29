import { getDb } from "../util/database";
import { ObjectId } from "mongodb";


export class User {
    username: string;
    email: string;
    _id : ObjectId | null;

    constructor(username:string, email:string, id: string){
        this._id = id ? new ObjectId(id) : null;
        this.username = username;
        this.email = email;
    }

    save() : Promise<any>{
        const db = getDb();
        const users = db.collection('users');

        if(this._id){
            return users.updateOne({
                _id: this._id
            }, {
                $set: this
            });
        }else{
            return users.insertOne(this);
        }
    }
    static findById(id : string) : Promise<any>{
        const db = getDb();
        const users = db.collection('users');

        return users.findOne({
            _id: new ObjectId(id)
        });
    }
} 