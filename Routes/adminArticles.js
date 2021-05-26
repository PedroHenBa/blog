const express = require("express");
const Router = express.Router();
//models
const adminAuth = require('../middleware/adminAuth');
const adminController = require('../Controllers/adminController')


//rota onde ficam os artigos
Router.get("/", adminAuth, adminController.admin_article_index);


//roda para fazer um novo arquivo
Router.get("/new", adminAuth, adminController.admin_article_create);


Router.get("/edit/:id",adminAuth , adminController.admin_article_edit);


module.exports = Router;