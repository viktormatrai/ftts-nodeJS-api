const express = require('express');
const router = express.Router();
const raceController = require('../controller/raceController');
const auth = require('../middleware/auth');

router.get("/", raceController.getAllRaces);

router.get("/race/:raceId", raceController.getRaceById);

router.post("/", auth, raceController.createRace);

router.patch("/race/:raceId", auth, raceController.updateRace);

router.delete('/race/:raceId', auth, raceController.deleteRace);

module.exports = router;