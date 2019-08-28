const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { config } = require('../../config')
const { isGroupMemberAsync, authenticateAdAsync } = require('../functions')
// Log in

router.post('/', async (req, res) => {
    let { username, password } = req.body
    try {
        let isMember = await isGroupMemberAsync(username, 'IT_ShareApp_Admin')

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
        return res.send(token)
    } catch (err) {
        console.error(err)
        return res.status(500).json([{ err: 'Błąd serwera' }])
    }
})

module.exports = router
