const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { config } = require('../../config')
const { isGroupMemberAsync, authenticateAdAsync } = require('../functions')
// Log in

router.post('/', async (req, res) => {
    let { username, password } = req.body
    try {
        let isMember = await isGroupMemberAsync(username, 'IT_ShareApp_Admin')
        console.log(username, password)
        if (!isMember)
            return res
                .status(400)
                .json([{ err: 'Niepoprawny login lub hasło' }])

        let validCreditals = await authenticateAdAsync(
            username + '@velvetcare.pl',
            password
        )

        if (!validCreditals)
            return res
                .status(400)
                .json([{ err: 'Niepoprawny login lub hasło' }])

        let token = await jwt.sign({ user: username }, config.PRIVATE_KEY)
        return res.json({ token })
    } catch (err) {
        console.error(err)
        return res.status(500).json([{ err: 'Błąd serwera' }])
    }
})

router.post('/auth', async (req, res) => {
    const token = req.header('x-auth-token')
    console.log(token)
    if (!token) return res.status(401).json({ authorized: false })
    try {
        const isValid = jwt.verify(token, config.PRIVATE_KEY)
        console.log(isValid)
        return res.json({ authorized: true })
    } catch (err) {
        return res.status(401).json({ authorized: false })
    }
})

module.exports = router
