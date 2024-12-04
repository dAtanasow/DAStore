const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { adController } = require('../controllers');

// middleware that is specific to this router

router.get('/', adController.getAll);
router.post('/', auth(), adController.create);

router.get('/:adId', adController.getById);
router.post('/:adId', auth(), adController.update);
router.delete('/:adId', auth(), adController.deleteById);

router.put('/cart', auth(), adController.addToCart);


// router.get('/my-trips/:id/reservations', auth(), themeController.getReservations);

module.exports = router