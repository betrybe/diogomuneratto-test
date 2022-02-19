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
        const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
        if (!recipe) return false;

        let response = {};
        if(recipe.userId == data.token._id || data.token.role == 'admin'){
            delete data.token;
            await db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: data }).then(async result => {
                response = await db.collection('recipes').findOne({ _id: ObjectId(id) });
            })
        } else {

        }

        return response;

    },
    
    destroy: async (id, token) => {

        const db = await conn();
        const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
        if (!recipe) return false;

        if(recipe.userId == token._id || token.role == 'admin'){
            return await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
        }        

    }
}