const express = require("express");
const Router = express.Router();
const adminController = require('../Controllers/adminController')
const adminAuth = require('../middleware/adminAuth')


Router.get('/',adminAuth, adminController.admin_category_index);

Router.get("/new", adminAuth, adminController.admin_category_create);

Router.get("/edit/:id",adminAuth, adminController.admin_category_edit);

module.exports = Router;