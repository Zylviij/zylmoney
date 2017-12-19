
const sqlite = require('sqlite3').verbose()


class DB {
    constructor(name) {
        if (!name) {
            name = ':memory:'
        }

        this.db = new sqlite.Database(name)
    }

    run(statement, callback) {
        this.db.run(statement, [], callback)
    }

    get(statement, callback) {
        this.db.get(statement, [], callback)
    }

    each(statement, callback) {
        this.db.each(statement, [], callback)
    }
}

module.exports = DB
