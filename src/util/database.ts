import { MongoClient } from "mongodb";

const uri = "mongodb+srv://srknzl:PaWS1EQ7E85MHMJP@srknzl-m0-development-cluster-hgcsl.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true });

export const mongoConnect = (callback : Function) => {
  client.connect()
  .then((client)=> {
    callback(client);
  })
  .catch(
    err => {
      throw err;
    }
  );
}