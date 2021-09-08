const connection = require('../database/connection');
const {DataTypes} = require("sequelize");


const Category = connection.define('categories', {
    title: {
        type : DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type : DataTypes.STRING,
        allowNull: false
    }
});

Category.sync();

module.exports = Category;
