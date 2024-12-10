const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { furnitureController } = require('../controllers');

router.get('/', furnitureController.getAll);
router.get('/:category', furnitureController.getByCategory);
router.get('/details/:furnitureId', furnitureController.getById);
router.put('/details/:furnitureId', auth(), furnitureController.update);
router.delete('/details/:furnitureId', auth(), furnitureController.deleteById);

module.exports = router