
const DB = require('./server/db.js')
const User = require('./server/user.js')


console.log('Making database')
const db = new DB('test')
console.dir(db)

console.log('Initializing database')
User.init(db, () => {
    console.log('Creating User')
    const user = new User('moo', 'squeak', 'diaz@squeakmail.com', 'brando', '1990s', '1 555 555 5555')
    console.dir(user)
    
    console.log('Adding user to database')
    User.create(db, user, () => {

        const print_data = (user) => {
            if (user) {
                console.log(user)
            } else {
                console.log('user not found')
            }
        }

        console.log('Testing user login.')
        User.login(db, user.username, 'SQUONK', print_data)
        User.login(db, user.username, 'squeak', print_data)
    })
})



