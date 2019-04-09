const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const teamController = require('../controller/teamController');

router.get('/', teamController.getAllTeams);
router.post('/new-team', auth, teamController.createTeam);
router.post('/assign/:teamId', auth, teamController.assignToTeam);
/* router.get('/:teamId', teamController.getTeamById);
router.delete('/:teamId', auth, admin, teamController.deleteTeam); */

module.exports = router;