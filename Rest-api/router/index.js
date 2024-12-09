const express = require('express');
const router = express.Router();
const users = require('./users');
const catalog = require('./catalog');
const create = require('./create');

router.use('/users', users);
router.use('/furniture', create);
router.use('/catalog', catalog);

module.exports = router;