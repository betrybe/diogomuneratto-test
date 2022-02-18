const MONGO_DB_URL = 'mongodb+srv://muneratto:400600@clusterdfm.xonbc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const DB_NAME = 'Cookmaster';

const { MongoClient } = require('mongodb');

const connection = () => MongoClient.connect(MONGO_DB_URL, {
    useUnifiedTopology: true
})
.then((conn) => conn.db(DB_NAME))
.catch((err) => {
    console.error(err);
    process.exit(1);
});

module.exports = connection;