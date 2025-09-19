const UserController = require('../controller/UserController')

const express = require('express')

const UserRoute = express.Router()

UserRoute.post('/register',UserController.register)
UserRoute.post('/login',UserController.login)

module.exports = UserRoute