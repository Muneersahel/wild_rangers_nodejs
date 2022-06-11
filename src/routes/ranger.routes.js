const express = require('express');

const rangerController = require('../controllers/ranger.controller');
const { isLoggedIn } = require('../middlewares/auth.middleware');

const router = express.Router();

// router.get('/dashboard', isLoggedIn, rangerController.getDashboard);
router.get('/rangers', rangerController.getRangers);
router.get('/ranger', isLoggedIn, rangerController.getRanger);
router.get('/users', isLoggedIn, rangerController.getUsers);

module.exports = router;
