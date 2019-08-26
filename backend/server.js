let express = require('express')
let cors = require('cors')
let app = express()
let fs = require('fs')

app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const users = require('./routes/Users')

app.use('/users', users)

app.listen('8080', async () => {
    console.log('start')
})
