import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017/';
const dbName = 'finance-report';

let db;

export const connectToDatabase = async () => {
  if (!db) {
    const client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
    console.log('Connected to MongoDB');
  }
  return db;
};
