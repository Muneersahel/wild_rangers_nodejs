const express = require('express');
const { body } = require('express-validator');

const userController = require('../controllers/user.controller');

const router = express.Router();

router.get('/login', userController.getLogin);
router.get('/dashboard', userController.getHome);
router.get('/users', userController.getUsers);

module.exports = router;
