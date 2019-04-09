const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const RacerTimeController = require('../controller/racerTimeController');

router.get('/:raceId', RacerTimeController.getTimesByRaceId);
router.post('/create-time/:race/:racer', auth, admin, RacerTimeController.createStartingTime);
router.post('/finishing-time/:timeId', auth, admin, RacerTimeController.setFinishingTime);
router.post('/neutral-zones/:timeId', auth, admin, RacerTimeController.setNeutralTimes);
router.post('/dnf/:timeId', auth, admin, RacerTimeController.setIfDNF);
router.post('/penalty/:timeId', auth, admin, RacerTimeController.setPenalty);
router.post('/save-final-time/:timeId', auth, admin, RacerTimeController.saveFinalTime);

module.exports = router;