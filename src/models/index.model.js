const { Sequelize, sequelize } = require('../config/database.config');
const User = require('./user/user.model');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = User;

module.exports = db;
