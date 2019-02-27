const express = require('express');
const router = express.Router();
const raceController = require('../controller/raceController');

router.get('/', raceController.getAllRaces);

router.get('/:raceId', raceController.getRaceById);

// router.post('/', auth, raceController.createRace);

// router.patch('/:raceId', auth, raceController.updateRace);

// router.delete('/:raceId', auth, raceController.deleteRace);

module.exports = router;