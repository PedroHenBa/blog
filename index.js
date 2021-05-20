const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/connection')
const session = require('express-session')

//contollers
const categoriesController = require('./categories/categoriesController');
const articleController = require('./articles/articleController')
const userController = require('./user/userContoller')

//models
const Article = require('./articles/Article');
const Category = require('./categories/Category');
const User = require('./user/User');

//setting view engine like ejs
app.set('view engine', 'ejs');

//Sessions

app.use(session({
    secret : "dajpsdpoaspodpaosjdposapodsoa",
    cookie : {maxAge : 30000}
}))

//uses static files
app.use(express.static('public'));

//body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//connection database
connection.authenticate()
    .then(() => console.log('conexao feita com sucesso'))
    .catch(error => console.log(error));

//using the routes of categories controller

app.use("/", categoriesController); // / is the prefix used for acesses the routes of categories controller
app.use('/', articleController);
app.use('/', userController);


app.get('/session', function (req, res){

})

app.get('/leitura', function (req, res){

})


app.get('/', function (req, res) {
    Article.findAll({
        order : [['id', 'DESC']],
        limit : 8
    })
        .then((articles) => {
            Category.findAll()
                .then((categories) => {
                    res.render('index', {articles: articles, categories : categories});
                })
        })
});

app.get('/:slug', function (req, res) {
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
});

app.get('/category/:slug', function (req, res) {
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
})


app.listen(8080, function () {
    console.log('servidor rodando');
});