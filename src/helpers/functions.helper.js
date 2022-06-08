const bcrypt = require('bcryptjs');
const { config } = require('../config/variables.config');

exports.generateHash = async (password) => {
    return await bcrypt.hash(password, Number(config.bcrypt.salt));
};

exports.comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};
