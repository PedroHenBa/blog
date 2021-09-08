const User =  require('../Models/User')
const bcrypt = require('bcryptjs');

const user_create = (req, res) => {
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
}

const user_authenticate = (req, res) => {
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
                    res.redirect('/user/login')
                }
            }else{
                res.redirect('/user/login')
            }
        })
}


const user_login = (req, res) => {
    res.render('admin/users/login');
}


const user_logout = (req, res) => {
    req.session.user = undefined;
    res.redirect('/user/login')
}

const user_register = (req, res) => {
    res.render('admin/users/register');
}


module.exports = {
    user_create,
    user_login,
    user_logout,
    user_authenticate,
    user_register
}
