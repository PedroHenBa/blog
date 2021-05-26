const Article = require('../Models/Article.js');
const Category = require('../Models/Category');
const slugify = require('slugify');

const article_save = (req, res) => {
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
}

const article_delete = (req, res) => {
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
}

const article_update = (req, res) => {
    const id = req.body.id;
    const body = req.body.body;
    const title = req.body.title;
    const categoryId = req.body.categoryId;
    Article.update(
        {title : title, slug : slugify(title), body : body, categoryId: categoryId},
        {where :{id : id}}
    ).then( () => res.redirect("/admin/articles"))
}

const article_page = (req, res) => {
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
}


module.exports = {
    article_save,
    article_delete,
    article_update,
    article_page
}