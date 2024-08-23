import {MongoClient, ServerApiVersion} from "mongodb";
import dotenv from 'dotenv';
dotenv.config({path: "./config.env"});
const  URI = process.env.MGDB_URI || "";

const client = new MongoClient(URI, {
   serverApi:{
       version: ServerApiVersion.v1,
       strict: true,
       deprecationErrors: true
   }
});

try {
    await client.connect();
    console.log('nous sommes bien connectés à MOngo ooo !');
} catch (err){
    console.error(err);
}

let db = client.db("music");

export default db;