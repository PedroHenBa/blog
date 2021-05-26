const express = require("express");
const Router = express.Router();
//middleware
const adminAuth = require('../middleware/adminAuth');
const adminController = require('../Controllers/articleController')

Router.post("/save",adminAuth, adminController.article_save);

//rota pra deletar um artigo
Router.post("/delete",adminAuth, adminController.article_delete);

Router.post("/update",adminAuth, adminController.article_update);

Router.get('/page/:num', adminController.article_page);

module.exports = Router;