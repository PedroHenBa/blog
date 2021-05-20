const express = require("express");
const Router = express.Router();
const Category = require('./Category');
const slugify = require('slugify');
const adminAuth = require('../middleware/adminAuth')




//adicionar nova categoria
Router.get("/admin/categories/new", adminAuth, function (req,res) {
    res.render('admin/categories/new');
});

//rota para adicionar uma categoria no banco de dados
Router.post('/categories/save',adminAuth, function (req, res) {
    const title = req.body.title;

    if(typeof title !== 'undefined'){
        Category.create({
            title : title,
            slug : slugify(title)
        }).then( () => {
            res.redirect('/admin/categories');
        });
    }else{
        res.redirect('/admin/categories/new');
    }

});

//rota para ver as categorias
Router.get('/admin/categories',adminAuth, function (req, res) {
    Category.findAll()
        .then( (categories) =>{
            res.render('admin/categories/index',
                {categories : categories});
        });
})

//rota para deletar uma categoria do banco de dados
Router.post("/categories/delete",adminAuth, function (req, res) {
    const id = req.body.id;
    if (id){
        Category.destroy({
            where : {id : id}
        }).then( () => {
            res.redirect('/admin/categories');
        });
    }else{
        res.redirect("/admin/categories/new")
    }
});

//rota para editar uma categoria, leva a um formulario
Router.get("/admin/categories/edit/:id",adminAuth, function (req,res) {
    const id = req.params.id;
    if(isNaN(id)){
        res.redirect('/admin/categories');
    }
    Category.findByPk(id)
        .then( (category) => {
            if (category){
                res.render('admin/categories/edit', {category : category})
            }else{
                res.redirect('/admin/categories');
            }
        }).catch( () => res.redirect('/admin/categories') )
});

Router.post("/categories/update",adminAuth, function (req, res) {
    const id = req.body.id;
    const title = req.body.title;
    Category.update(
        {title : title, slug : slugify(title)},
        {where :{id : id}}
    ).then( () => res.redirect("/admin/categories"))
});


module.exports = Router;