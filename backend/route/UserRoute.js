const UserController = require('../controller/UserController')

const express = require('express')

const UserRoute = express.Router()

UserRoute.post('/register',UserController.register)

module.exports = UserRoute