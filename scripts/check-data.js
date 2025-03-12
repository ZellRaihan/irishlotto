const { MongoClient } = require('mongodb');
require('dotenv').config();

// Database name constant to ensure consistency
const DB_NAME = process.env.DB_NAME || 'lottery';

async function main() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error('Please set MONGODB_URI environment variable');
        process.exit(1);
    }
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(DB_NAME);
        console.log(`Using database: ${DB_NAME}`);
        
        // List all collections
        const collections = await db.listCollections().toArray();
        console.log('\nCollections in database:', collections.map(c => c.name));

        // Check data in lottoresults collection
        const collection = db.collection('lottoresults');
        const count = await collection.countDocuments();
        console.log('\nNumber of documents in lottoresults:', count);

        if (count > 0) {
            // Get a sample document
            const sample = await collection.findOne();
            console.log('\nSample document structure:', JSON.stringify(sample, null, 2));
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
