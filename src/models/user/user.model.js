const { sequelize, Sequelize } = require('../../config/database.config');

const User = sequelize.define(
    'user',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        hooks: {
            beforeCreate: (user) => {
                user.name = user.name.toLowerCase();
                user.email = user.email.toLowerCase();

                return user;
            },
            beforeUpdate: (user) => {
                user.name = user.name.toLowerCase();
                user.email = user.email.toLowerCase();

                return user;
            },
        },
    }
);

module.exports = User;
