let express = require('express')
let cors = require('cors')
let path = require('path')
let app = express()
const users = require('./routes/Users')
const admin = require('./routes/Admin')
const update = require('./routes/Updates')

app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('build'))
app.use('/users', users)
app.use('/admin', admin)
app.use('/update', update)

app.get('/', (req, res) => {
    console.log('?')
    res.sendFile('index.html', { root: path.join(__dirname, '/build') })
})

app.listen('8080', async () => {
    console.log('start')
})
