const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controller/userController');

router.get('/', userController.getAllRacers);
router.get('/me', auth, userController.returnUserByToken);
router.get('/user/:userId', userController.getUserById);
router.post('/signup', userController.signUp);
router.post('/login', userController.logIn);
router.delete('/:userId', auth, userController.deleteUser);

module.exports = router;