

const crypto = require('crypto-js')


class User {
    constructor(username, password, email, name, date_of_birth, phone) {
        this.username = username

        this.password_hash = User.hash(username, password)

        this.email = email

        this.name = name

        this.date_of_birth = date_of_birth
        this.phone = phone
    }

    static hash(username, password) {
        const salt = crypto.SHA256(username).toString(crypto.enc.Base64)
        return crypto.SHA256(salt + password).toString(crypto.enc.Base64)
    }

    // Database

    static login(db, username, password, callback) {
        // login attempt hash
        const password_hash = User.hash(username, password)
        
        db.get(`SELECT * FROM users WHERE username = '${username}';`, (error, row) => {
            // database errors
            if (error) {
                console.log(error)

                callback(undefined) // undefined -> error
                return
            }

            // parse selection
            try {
                const user = JSON.parse(crypto.AES.decrypt(row.data, password_hash).toString(crypto.enc.Utf8))

                if (user.password_hash === password_hash) {
                    callback(user)
                } else {
                    callback(null) // null -> not found
                }
            } catch (e) {
                // changing the encoding and parsing can both fail
                callback(null) // null -> not found
            }
        })
    }

    static create(db, user, callback) {
        const data = crypto.AES.encrypt(JSON.stringify(user), user.password_hash)

        db.run(`INSERT INTO users (username, data) VALUES ('${user.username}', '${data}');`, callback)
    }

    static init(db, callback) {
        db.run(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL, username TEXT, data TEXT);`, callback)
    }
}

module.exports = User
