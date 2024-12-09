const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');
const { auth } = require('../utils');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.get('/ads', auth(), authController.getUserAds);
router.get('/profile', auth(), authController.getProfileInfo);
router.get('/profile/:id', auth(), authController.getUserById);
router.put('/profile', auth(), authController.editProfileInfo);

router.get('/cart', auth(), authController.getCartItems);
router.post('/cart', auth(), authController.addToCart);
router.delete('/cart/:itemId', auth(), authController.removeFromCart);


module.exports = router