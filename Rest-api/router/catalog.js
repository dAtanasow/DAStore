const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { furnitureController } = require('../controllers');

router.get('/', furnitureController.getAll);

router.get('/:furnitureId', furnitureController.getById);
router.put('/:furnitureId', auth(), furnitureController.update);
router.delete('/:furnitureId', auth(), furnitureController.deleteById);

module.exports = router