const express = require('express');
const router = express.Router();
const raceController = require('../controller/raceController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get("/", raceController.getAllRaces);

router.get("/:raceId", raceController.getRaceById);

router.post("/", auth, admin, raceController.createRace);

router.patch("/:raceId", auth, admin, raceController.updateRace);

router.delete('/:raceId', auth, admin, raceController.deleteRace);
router.post('/assign-to-race/:raceId', auth, raceController.assignToRace);


module.exports = router;