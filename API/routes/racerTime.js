const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const RacerTimeController = require('../controller/racerTimeController');

router.post('/create-time/:race/:racer', auth, admin, RacerTimeController.createStartingTime);
router.post('/finishing-time/:timeId', auth, admin, RacerTimeController.setFinishingTime);

module.exports = router;