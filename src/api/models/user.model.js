const conn = require('../private/db');

module.exports = {

    getAll: async () => {
        const db = await conn();
        return db.collection('users').find().toArray();
    },

    get: async (id) => {
        const db = await conn();
        return db.collection('users').find().toArray();
    },

    save: async (data) => {
        const db = await conn();
        return db.collection('users').find().toArray();
    },

    update: async (id, data) => {
        // const db = await conn();
        // return db.collection('users').find().toArray();
        return true;
    },
    destroy: async (id) => {
        // const db = await conn();
        // return db.collection('users').find().toArray();
        return true;
    }
}