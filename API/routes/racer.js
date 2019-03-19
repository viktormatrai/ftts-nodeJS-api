const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controller/userController');

router.get('/', userController.getAllRacers);
router.get('/:userId', userController.getUserById);



module.exports = router;