function adminAuth(req, res, next) {
    if(typeof req.session.user === "undefined"){
        res.redirect('/login');
    }else{
        next();
    }
}

module.exports = adminAuth;