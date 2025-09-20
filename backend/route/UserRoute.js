const UserController = require('../controller/UserController')

const express = require('express')
const { authenticateToken } = require('../middleware/authMiddleware')

const UserRoute = express.Router()

UserRoute.post('/register',UserController.register)
UserRoute.post('/login',UserController.login)
UserRoute.post('/refresh',UserController.refresh)
UserRoute.post('/logout',UserController.logout)

UserRoute.get('/normal', UserController.normal)

UserRoute.get('/protected',authenticateToken,UserController.protected)
UserRoute.post('/update-password',authenticateToken,UserController.updatePassword)

UserRoute.post('/forgot-password',UserController.forgotPassword)
UserRoute.post('/reset-password/:token',UserController.resetPassword)

module.exports = UserRoute