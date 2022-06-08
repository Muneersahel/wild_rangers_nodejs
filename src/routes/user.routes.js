const express = require('express');
const { body } = require('express-validator');

const userController = require('../controllers/user.controller');

const router = express.Router();

router.get('/dashboard', userController.getDashboard);
router.get('/ranger', userController.getRanger);
router.get('/rangers', userController.getRangers);
router.get('/users', userController.getUsers);

module.exports = router;
