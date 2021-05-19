const express = require("express");
const Router = express.Router();
const Article = require('./Article.js');
const Category = require('../categories/Category');
const slugify = require('slugify');


//rota onde ficam os artigos
Router.get("/admin/articles", function (req,res) {
    Article.findAll({
        include : [{model : Category}]
    })
        .then( articles =>{
            res.render('admin/articles/index', {articles : articles});
        });
})

//roda para fazer um novo arquivo
Router.get("/admin/articles/new", function (req,res) {
    Category.findAll()
        .then( (categories) =>{
            res.render('admin/articles/new', {categories : categories})
        })
        .catch( (error) => {
            console.log(error);
            res.redirect('/');
        })
});

//rota pra salvar um arquivo
Router.post("/articles/save", function (req, res) {
    const title = req.body.title;
    const body = req.body.body;
    const categoryId = req.body.categoryId;
    const slug = slugify(title);

    Article.create({
        title : title,
        slug : slug,
        body : body,
        categoryId : categoryId
    })
        .then( () => res.redirect('/admin/articles') )
        .catch( (error) =>{
            console.log(error);
            res.redirect('/admin/articles/new');
        } )

})

//rota pra deletar um artigo
Router.post("/articles/delete", function (req, res) {
    const id = req.body.id;
    if (id){
        Article.destroy({
            where : {id : id}
        }).then( () => {
            res.redirect('/admin/articles');
        });
    }else{
        res.redirect("/admin/articles/new")
    }
});

Router.get("/admin/articles/edit/:id", function (req,res) {
    const id = req.params.id;
    if(isNaN(id)){
        res.redirect('/admin/articles');
    }
    Article.findByPk(id, {
        include : [{model : Category}]
    })
        .then( (article) => {
            if (article){
                Category.findAll()
                    .then( (categories) =>{
                        res.render('admin/articles/edit', {article : article ,categories : categories});
                    });
            }else{
                res.redirect('/admin/articles');
            }
        }).catch( () => res.redirect('/admin/articles') )
});

Router.post("/articles/update", function (req, res) {
    const id = req.body.id;
    const body = req.body.body;
    const title = req.body.title;
    const categoryId = req.body.categoryId;
    Article.update(
        {title : title, slug : slugify(title), body : body, categoryId: categoryId},
        {where :{id : id}}
    ).then( () => res.redirect("/admin/articles"))
});

Router.get('/articles/page/:num', function (req, res) {
    const page = req.params.num;
    let offset;
    if(isNaN(page)){
        offset = 0;
    }else{
        offset = parseInt(page) * 8;
    }
    Article.findAndCountAll({
        order : [['id', 'DESC']],
        limit : 8,
        offset : offset
    })
        .then(articles => {
            let next;
            next = offset + 8 <= articles.count;


            const result = {
                page :  parseInt(page),
                next : next,
                articles : articles
            }
            Category.findAll().then(categories =>{
            res.render('admin/articles/page', {result, categories});
            })
        })
})

module.exports = Router;