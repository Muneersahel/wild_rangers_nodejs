const { Sequelize } = require('sequelize');
const { config } = require('./variables.config');

const sequelize = new Sequelize(
    config.db.name,
    config.db.user,
    config.db.pass,
    {
        host: config.db.host,
        dialect: 'mysql',
        timezone: config.timezone,
        dialectOptions: {
            timezone: 'local',
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        logging: false,
        define: {
            underscored: true,
        },
    }
);

module.exports = {
    sequelize,
    Sequelize,
};
