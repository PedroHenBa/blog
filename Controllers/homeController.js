const Category = require('../Models/Category');
const Article = require('../Models/Article');


const home_index = (req, res) => {
    Article.findAll({
        order : [['id', 'desc']],
        limit : 8
    }).then((articles) => {
            Category.findAll().then((categories) => {
                    res.render('index', {articles: articles, categories : categories});
                })
        }).catch( (error) => {
            console.log(error);
    })
}


const home_findOne_article = (req, res) => {
    const slug = req.params.slug;
    Article.findOne({
        where: {slug: slug}
    })
        .then((article) => {
            if (article) {
                Category.findAll()
                    .then((categories) => {
                        res.render('article', {article: article, categories : categories});
                    })
            }else{
                res.redirect('/');
            }
        })
        .catch(error => {
            console.log(error);
            res.redirect('/');
        })
}

const home_findByCategory_article = (req, res) => {
    const slug = req.params.slug;
    Category.findOne({
        where : {slug : slug},
        include : [{model : Article}]
    })
        .then( (category) => {
            if(category){
                Category.findAll()
                    .then((categories) => {
                        res.render('index', {articles: category.articles , categories : categories});
                    })
            }else{
                res.redirect('/');
            }
        })
        .catch( (error) => {
            console.log(error);
        })
}

const home_index_admin = (req, res) => {
    Article.findAll({
        order : [['id', 'desc']],
        limit : 8
    }).then((articles) => {
        Category.findAll().then((categories) => {
            res.render('indexAdmin', {articles: articles, categories : categories});
        })
    }).catch( (error) => {
        console.log(error);
    })
}

module.exports = {
    home_index_admin,
    home_index,
    home_findByCategory_article,
    home_findOne_article
}