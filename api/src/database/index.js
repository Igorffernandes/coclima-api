const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const bcrypt = require("bcrypt-nodejs");


const User = require('./models/Users');

const connection = new Sequelize(dbConfig);

User.init(connection);

module.exports = connection;