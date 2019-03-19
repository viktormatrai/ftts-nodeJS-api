const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controller/userController');

router.get('/racers', userController.getAllRacers);

router.get('/:userId', userController.getUserbyId);

module.exports = router;