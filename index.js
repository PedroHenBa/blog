const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/connection')

//contollers
const categoriesController = require('./categories/categoriesController');
const articleController = require('./articles/articleController')

const Article = require('./articles/Article');
const Category = require('./categories/Category');

//setting view engine like ejs
app.set('view engine', 'ejs');

//uses static files
app.use(express.static('public'));

//body parser
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

//connection database
connection.authenticate()
    .then( () => console.log('conexao feita com sucesso'))
    .catch( error => console.log(error));

//using the routes of categories controller

app.use("/", categoriesController); // / is the prefix used for acesses the routes of categories controller
app.use('/', articleController);

app.get('/', function (req, res){
    res.render('index');
});

app.listen(8080, function () {
    console.log('servidor rodando');
});