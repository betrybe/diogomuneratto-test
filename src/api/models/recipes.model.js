const ObjectId = require('mongodb').ObjectID;
const conn = require('../private/db');

module.exports = {
    getAll: async () => {
        const db = await conn();
        return db.collection('recipes').find().toArray();
    },
    get: async (id) => {
        try {
            const db = await conn();
            return await db.collection('recipes').findOne({ _id: ObjectId(id) });
        } catch (error) {
            return false;
        }
    },
    save: async (data) => {
        const db = await conn();
        return db.collection('recipes').insertOne(data).then((result) => result.ops[0]);
    },
    update: async (id, data) => {
        const db = await conn();
        return db.collection('recipes').updateOne(
            { _id: ObjectId(id) }, 
            { $set: data },
        ).then(async () => db.collection('recipes').findOne({ _id: ObjectId(id) }));
    },
    destroy: async (id) => {
        const db = await conn();
        return db.collection('recipes').deleteOne({ id: ObjectId(id) });
    },
};