const express = require("express");
const Router = express.Router();

Router.get("/articles", function (req,res) {
    res.send('pagina de artigos');
})

Router.get("/admin/article/new", function (req,res) {
    res.send('pagina de criacao de um artigo');
});

module.exports = Router;