import { MongoClient, Db } from "mongodb";

const uri = "mongodb+srv://srknzl:PaWS1EQ7E85MHMJP@srknzl-m0-development-cluster-hgcsl.mongodb.net/learnnode-shop?retryWrites=true&w=majority";

const mongoClient = new MongoClient(uri, { useNewUrlParser: true });

let _db : undefined | Db;

export const mongoConnect = async (callback : Function) => {
  try{
    const client = await mongoClient.connect();
    _db = client.db();
    callback();
  }catch(err){
    throw err;
  }
}
export const getDb = () => {
  if(_db){
    return _db;
  }
  throw "No database found";
}