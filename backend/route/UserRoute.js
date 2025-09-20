const UserController = require('../controller/UserController')

const express = require('express')
const { authenticateToken } = require('../middleware/authMiddleware')

const UserRoute = express.Router()

UserRoute.post('/register',UserController.register)
UserRoute.post('/login',UserController.login)
UserRoute.post('/refresh',UserController.refresh)
UserRoute.post('/logout',UserController.logout)

UserRoute.get('/protected',authenticateToken,UserController.protected)

module.exports = UserRoute