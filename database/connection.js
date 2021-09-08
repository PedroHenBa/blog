const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const { NAME_DATABASE, DATABASE_USER, PASSWORD, HOST } = process.env;

console.log(NAME_DATABASE, DATABASE_USER, PASSWORD, HOST);

const connection = new Sequelize(NAME_DATABASE, DATABASE_USER, PASSWORD,{
    host: HOST,
    dialect : 'mysql',
    timezone : '-03:00'
});

module.exports = connection;