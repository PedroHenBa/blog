const Sequelize = require('sequelize');

const connection = new Sequelize('guiapress', 'root', 'toor',{
    host: 'localhost',
    dialect : 'mysql'
});

module.exports = connection;