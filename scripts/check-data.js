const { MongoClient } = require('mongodb');

async function main() {
    const uri = 'mongodb+srv://rhnsardar4:rhnsardar4@cluster0.pjwgm.mongodb.net/lottery?retryWrites=true&w=majority';
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('lottery');
        
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
