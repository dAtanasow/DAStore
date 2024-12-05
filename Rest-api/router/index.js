const router = require('express').Router();
const users = require('./users');
const { authController } = require('../controllers');
const catalog = require('./catalog');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.use('/users', users);
router.use('/catalog', catalog);

module.exports = router;
