const jwt = require('jsonwebtoken')
const { config } = require('../../config')

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token')
    console.log(req.body)
    if (!token) {
        return res.status(401).json([{ msg: 'Not authorized' }])
    }

    try {
        const decoded = jwt.verify(token, config.PRIVATE_KEY)
        req.user = decoded.user
        next()
    } catch (err) {
        return res.status(401).json([{ msg: 'Token invalid' }])
    }
}
