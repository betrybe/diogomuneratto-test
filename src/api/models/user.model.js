const conn = require('../private/db');
const ObjectId = require('mongodb').ObjectID;

module.exports = {

    getAll: async () => {
        const db = await conn();
        return db.collection('users').find().toArray();
    },

    get: async (id) => {
        try {
            const db = await conn();
            const response = await db.collection('users').findOne({ _id: ObjectId(id) });
            return (response._id) ? response : false;
        } catch (error) {
            return false;
        }
    },

    save: async (data) => {

        const db = await conn();

        const user = await db.collection('users').findOne({ email: data.email });
        if (user) return false;

        let response = {};
        await db.collection('users').insertOne(data).then(result => {
            delete result.ops[0].password;
            response= {"user" : result.ops[0]};
        })

        return response;
    },

    update: async (id, data) => {

        const db = await conn();
        const user = await db.collection('users').findOne({ _id: ObjectId(id) });
        if (!user) return false;

        return await db.collection('users').updateOne({ _id: ObjectId(id) }, { $set: data });
        
    },
    
    destroy: async (id) => {

        const db = await conn();
        return await db.collection('users').remove({ _id: ObjectId(id) });

    }
}