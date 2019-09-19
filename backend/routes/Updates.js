const router = require('express').Router()
const auth = require('../middleware/auth')

router.put('/', auth, async (req, res) => {
    res.json({ ok: 'ok' })
})

module.exports = router
