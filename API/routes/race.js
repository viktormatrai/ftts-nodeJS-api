const express = require('express');
const router = express.Router();
const raceController = require('../controller/raceController');
const racerTimeController = require('../controller/racerTimeController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get("/", raceController.getAllRaces);
router.get("/:raceId", raceController.getRaceById);
router.post("/", auth, admin, raceController.createRace);
router.patch("/:raceId", auth, admin, raceController.updateRace);
router.delete('/:raceId', auth, admin, raceController.deleteRace);
router.post('/assign-to-race/:raceId', auth, raceController.assignToRace);

//racerTime related routes
router.get('/times/:raceId', racerTimeController.getTimesByRaceId);
router.post('/create-time/:race/:racer', auth, admin, racerTimeController.createStartingTime);
router.post('/finishing-time/:timeId', auth, admin, racerTimeController.setFinishingTime);
router.post('/neutral-zones/:timeId', auth, admin, racerTimeController.setNeutralTimes);
router.post('/dnf/:timeId', auth, admin, racerTimeController.setIfDNF);
router.post('/penalty/:timeId', auth, admin, racerTimeController.setPenalty);
router.post('/save-final-time/:timeId', auth, admin, racerTimeController.saveFinalTime);


module.exports = router;