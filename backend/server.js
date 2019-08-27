let express = require('express')
let cors = require('cors')
let app = express()

const users = require('./routes/Users')

app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('../build'))
app.use('/users', users)

app.get('/', (req, res) => {
    res.sendFile('index.html')
})

app.listen('8080', async () => {
    console.log('start')
})