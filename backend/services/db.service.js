const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://dandi:BCt4LJl1NN3kTB6O@cluster0.2suxy.mongodb.net/health-E?retryWrites=true&w=majority`

module.exports = {
    getCollection
}

// Database Name
const dbName = 'health-E';

var dbConn = null;

async function getCollection(collectionName) {
    const db = await connect()
    return db.collection(collectionName);
}

async function connect() {
    if (dbConn) return dbConn;
    try {
        const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(dbName);
        dbConn = db;
        return db;
    } catch (err) {
        console.log('Cannot Connect to DB', err)
        throw err;
    }
}

