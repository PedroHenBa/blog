const Article = require('../Models/Article.js');
const Category = require('../Models/Category');
const User =  require('../Models/User')


// Logica Artigo

const admin_article_index = (req, res) => {
    Article.findAll({
        include : [{model : Category}]
    })
        .then( articles =>{
            res.render('admin/articles/index', {articles : articles});
        });
}

const admin_article_create = (req, res) => {
    Category.findAll()
        .then( (categories) =>{
            res.render('admin/articles/new', {categories : categories})
        })
        .catch( (error) => {
            console.log(error);
            res.redirect('/');
        })
}

const admin_article_edit = (req, res) => {
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
}

// Category

const admin_category_index = (req, res) => {
    Category.findAll()
        .then( (categories) =>{
            res.render('admin/categories/index',
                {categories : categories});
        });
}

const admin_category_create = (req, res) => {
    res.render('admin/categories/new');
}

const admin_category_edit = (req, res) => {
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
}

//User

const admin_user_index = (req, res) => {
    User.findAll()
        .then(users => {
            res.render('admin/users/index', {users: users})
        })
        .catch(error => {
            console.log(error);
            res.redirect('/');
        })
}

const admin_user_create = (req, res) => {
    res.render('admin/users/create');
}




module.exports = {
    admin_article_index,
    admin_article_create,
    admin_article_edit,
    admin_category_index,
    admin_category_create,
    admin_category_edit,
    admin_user_index,
    admin_user_create
}