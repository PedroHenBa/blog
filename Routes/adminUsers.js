const express = require("express");
const Router = express.Router();
const adminController = require('../Controllers/adminController')
const adminAuth = require('../middleware/adminAuth')




Router.get('/', adminAuth, adminController.admin_user_index);


Router.get('/create', adminAuth, adminController.admin_user_create);


module.exports = Router;