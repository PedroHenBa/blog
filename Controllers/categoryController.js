const Category = require('../Models/Category');
const slugify = require('slugify');


const category_save = (req, res) => {
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
}

const category_delete = (req, res) => {
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
}

const category_update = (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    Category.update(
        {title : title, slug : slugify(title)},
        {where :{id : id}}
    ).then( () => res.redirect("/admin/categories"))
}

module.exports = {
    category_save,
    category_delete,
    category_update
}