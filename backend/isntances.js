const ActiveDirectory = require('activedirectory')
const { config } = require('../config')

module.exports.ad = new ActiveDirectory(config.AD)
