const { user: User } = require('../models/index.model');
const { validationResult } = require('express-validator');
const { comparePassword } = require('../helpers/functions.helper');
const { config } = require('../config/variables.config');

// get login page

exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorsArray = errors.array().map((error) => error.msg);
            // render login page with errors with old email input
        }

        const user = await User.findOne({
            where: { email: email },
        });

        if (!user) {
            // render login page with errors (Email or password is incorrect)
        }
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            // render login page with errors (Email or password is incorrect)
        }

        req.session.isAuthenticated = true;
        req.session.user = {
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin,
        };

        console.log(req.session);

        // redirect to dashboard
    } catch (error) {
        console.log(error);
    }
};

exports.logoutAdmin = async (req, res) => {
    req.session.destroy((err) => {
        if (err && config.nodeEnv !== 'production') {
            console.log(err);
        }
        // redirect to login page
    });
};
