const ObjectId = require('mongodb').ObjectID;
const conn = require('../private/db');

module.exports = {
    getAll: async () => {
        const db = await conn();
        return db.collection('users').find().toArray();
    },
    get: async (id) => {
        try {
            const db = await conn();
            const response = await db.collection('users').findOne({ _id: ObjectId(id) });
            return (response.id) ? response : false;
        } catch (error) {
            return false;
        }
    },
    save: async (data) => {
        const db = await conn();
        const user = await db.collection('users').findOne({ email: data.email });
        if (user) return false;
        return db.collection('users').insertOne(data).then((result) => {
            const res = result;
            delete res.ops[0].password;
            return { user: res.ops[0] };
        });
    },
};