const express = require("express");
const Router = express.Router();
const userController = require('../Controllers/userController')
const adminAuth = require('../middleware/adminAuth')


Router.post("/create", adminAuth,  userController.user_create)

Router.get('/login', userController.user_login)

Router.post("/authenticate", userController.user_authenticate)

Router.get('/logout', userController.user_logout)

module.exports = Router;