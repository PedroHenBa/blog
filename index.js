const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/connection')
const session = require('express-session')

//contollers
const categoryRouter = require('./Routes/category');
const articleRouter = require('./Routes/article')
const userRouter = require('./Routes/user')
const adminUsersRouter = require('./Routes/adminUsers')
const adminArticlesRouter = require('./Routes/adminArticles')
const adminCategoriesRouter = require('./Routes/adminCategories')
const homeRouter = require('./Routes/home')

//setting view engine like ejs
app.set('view engine', 'ejs');

//Sessions

app.use(session({
    secret : "dajpsdpoaspodpaosjdposapodsoa",
    cookie : {maxAge : 3000000000}
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

app.use("/category", categoryRouter); // / is the prefix used for acesses the routes of categories controller
app.use('/article', articleRouter);
app.use('/user', userRouter);
app.use('/admin/users', adminUsersRouter);
app.use('/admin/articles', adminArticlesRouter);
app.use('/admin/categories', adminCategoriesRouter);
app.use('/', homeRouter);




app.listen(8080, function () {
    console.log('servidor rodando');
});