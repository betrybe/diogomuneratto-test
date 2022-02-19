const conn = require('../private/db');
const ObjectId = require('mongodb').ObjectID;

module.exports = {

    getAll: async () => {
        const db = await conn();
        return db.collection('recipes').find().toArray();
    },

    get: async (id) => {
        try {
            const db = await conn();
            const response = await db.collection('recipes').findOne({ _id: ObjectId(id) });
            return (response._id) ? response : false;
        } catch (error) {
            return false;
        }
    },

    save: async (data) => {

        const db = await conn();

        let response = {};
        await db.collection('recipes').insertOne(data).then(result => {
            response= {"recipe" : result.ops[0]};
        })

        return response;
    },

    update: async (id, data) => {

        const db = await conn();
        const user = await db.collection('recipes').findOne({ _id: ObjectId(id) });
        if (!user) return false;

        return await db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: data });
        
    },
    
    destroy: async (id) => {

        const db = await conn();
        return await db.collection('recipes').remove({ _id: ObjectId(id) });

    }
}