const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { furnitureController } = require('../controllers');

router.post('/create', auth(), furnitureController.create);

module.exports = router;