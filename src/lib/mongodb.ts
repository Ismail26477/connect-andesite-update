import { MongoClient, Db, ObjectId } from 'mongodb';

const MONGODB_URI = 'mongodb+srv://ismail:ismail123@cluster0.fjw1q9u.mongodb.net/?appName=Cluster0';
const DATABASE_NAME = 'bni';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db(DATABASE_NAME);
    
    cachedClient = client;
    cachedDb = db;
    
    console.log('[v0] Connected to MongoDB');
    return { client, db };
  } catch (error) {
    console.error('[v0] MongoDB connection error:', error);
    throw error;
  }
}

export async function getDatabase(): Promise<Db> {
  const { db } = await connectToDatabase();
  return db;
}

export async function initializeCollections() {
  const db = await getDatabase();
  
  // Create members collection if it doesn't exist
  const collections = await db.listCollections().toArray();
  const collectionNames = collections.map(c => c.name);
  
  if (!collectionNames.includes('members')) {
    await db.createCollection('members');
    console.log('[v0] Created members collection');
    
    // Create indexes for better performance
    const membersCollection = db.collection('members');
    await membersCollection.createIndex({ name: 1 });
    await membersCollection.createIndex({ category: 1 });
    await membersCollection.createIndex({ created_at: -1 });
    console.log('[v0] Created indexes on members collection');
  }
}

export function convertObjectId(doc: any): any {
  if (!doc) return null;
  return {
    ...doc,
    id: doc._id?.toString() || '',
  };
}

export function convertObjectIdArray(docs: any[]): any[] {
  return docs.map(convertObjectId);
}
