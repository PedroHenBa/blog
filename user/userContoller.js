const express = require('express');
const Router = express.Router();
const User = require('./User');
const bcrypt = require('bcryptjs');
const adminAuth = require('../middleware/adminAuth')


Router.get('/admin/users', adminAuth, function (req, res) {
    User.findAll()
        .then(users => {
            res.render('admin/users/index', {users: users})
        })
        .catch(error => {
            console.log('error');
            res.redirect('/');
        })
});


Router.get('/admin/users/create', adminAuth, function (req, res) {
    res.render('admin/users/create');
})

Router.post("/users/create", function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({
        where: {email: email}
    }).then(user => {
        if (user) {
            res.redirect('/admin/users/create');
        } else {

            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password, salt);
            User.create({
                email: email,
                password: hash
            }).then(() => {
                res.redirect('/');
            }).catch(error => res.redirect('/'))

        }
    });
});

Router.get('/login', function (req, res) {
    res.render('admin/users/login');
})

Router.post("/authenticate", function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({
        where : {email : email}
    })
        .then( user => {
            if(user){
                const correct = bcrypt.compareSync(password, user.password);
                if(correct){
                    req.session.user = {
                        id : user.id,
                        email : user.email
                    }
                    res.redirect('/admin/articles')
                }else{
                    res.redirect('/login')
                }
            }else{
                res.redirect('/login')
            }
        })
})

Router.get('/logout', function (req, res) {
    req.session.user = undefined;
    res.redirect('/login')
})

module.exports = Router;

