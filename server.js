const express = require('express')
const server = express()
const funnyRouter = require('./api/funnyRouter')

server.use(express.json())
server.use('/jokes', funnyRouter)

module.exports = server