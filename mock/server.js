let express = require('express')
let cors = require('cors')
let app = express()
let { data } = require('./data')
app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/users/data', (req, res) => {
    console.log(Object.keys(data))
    res.json(data[req.body.query])
})
app.listen('8080', async () => {
    console.log('start')
})
