const express = require('express');
const { body } = require('express-validator');

const authController = require('../controllers/auth.controller');

const router = express.Router();


router.get('/login', authController.getLogin);
router.post(
    '/login',
    [
        body('email')
            .notEmpty()
            .withMessage('Email is required')
            .isEmail()
            .withMessage('Email is not valid'),
        body('password')
            .isLength({ min: 5 })
            .withMessage('Password must be at least 5 characters long'),
    ],
    authController.loginAdmin
);

module.exports = router;
