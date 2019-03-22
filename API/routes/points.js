const express = require('express');
const router = express.Router();
const pointsController = require('../controller/pointsController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.post('/calculate/:raceId', auth, admin, pointsController.calculatePoints);

module.exports = router;