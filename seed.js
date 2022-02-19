// colocar query do MongoDB
const conn = require('./src/api/private/db');

class userAdmin {

    constructor(paramName, paramEmail, paramPassword) {
        this.name = paramName;
        this.email = paramEmail;
        this.password = paramPassword;
    } async fcnSend() {

        try {

            let db = await conn();
            let data = { name: this.name, email: this.email, password: this.password, role: 'admin' };

            let response = {};
            await db.collection('users').insertOne(data).then(result => {
                response = { "recipe": result.ops[0] };
            })

            console.log('Email already registered');
            return response;

        } catch (error) {
            return false;
        }

    }

}

let user = new userAdmin("admin", "root@email.com", "admin");
user.fcnSend()