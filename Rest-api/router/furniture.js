const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { furnitureController } = require('../controllers');

// middleware that is specific to this router


router.post('/create', auth(), furnitureController.create);
router.post('/cart', furnitureController.addToCart);
router.get('/cart', furnitureController.getUserCart);

module.exports = router