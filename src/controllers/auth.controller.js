const { user: User } = require('../models/index.model');
const { validationResult } = require('express-validator');
const { comparePassword } = require('../helpers/functions.helper');
const { config } = require('../config/variables.config');

// get login page
exports.getLogin = (req, res, next) => {
    res.render('login');
};

exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorsArray = errors.array().map((error) => error.msg);
            console.log(errorsArray);
            // render login page with errors with old email input
        }

        const user = await User.findOne({
            where: { email: email },
        });

        if (!user) {
            const message = 'Email or password is incorrect';
            console.log(message, ' - user not found');
            return res.render('login', { message: message });
        }
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            const message = 'Email or password is incorrect';
            console.log(message, ' - password');
            return res.render('login', { message: message });
        }

        req.session.isAuthenticated = true;
        req.session.user = {
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin,
        };

        console.log('Login Successfully!');
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
    }
};

exports.logoutAdmin = async (req, res) => {
    req.session.destroy((err) => {
        if (err && config.nodeEnv !== 'production') {
            console.log(err);
        }
        const message = 'Logout Successfully!';
        console.log(message);
        res.redirect('login');
    });
};
