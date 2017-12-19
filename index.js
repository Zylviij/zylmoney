
const import = (path) => {
    return require(__dirname + '/' + path + '.js')
}



const express = require('express')
const app = express()

app.use(express.static('app'))

app.get('/', (req, res) => {
    res.send('hello, world!')
})

const port = 3000

app.listen(port, () => {
    console.log(`Listening on port ${port}!`)
})
