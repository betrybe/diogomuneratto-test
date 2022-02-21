const conn = require('./src/api/private/db');

conn().then((db) => {
    db.collection('users').insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' });
})