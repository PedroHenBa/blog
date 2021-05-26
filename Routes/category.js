const express = require("express");
const Router = express.Router();
const categoryController = require('../Controllers/categoryController')
const adminAuth = require('../middleware/adminAuth')



Router.post('/save',adminAuth, categoryController.category_save)

Router.post("/delete",adminAuth, categoryController.category_delete)

Router.post("/update",adminAuth, categoryController.category_update)

module.exports = Router;