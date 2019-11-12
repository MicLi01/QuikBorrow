/** @module api/items */

const express = require('express');
const router = new express.Router();
const {param} = require('express-validator');
const itemController = require('../../controllers/items');
const validatorErrors = require('../../middleware/shared/validatorErrors');

/**
 * @memberof module:api/items
 * @name POST /
 */
router.post('/', itemController.create);

/**
 * @memberof module:api/items
 * @name GET /
 */
router.get('/', itemController.getAll);

/**
 * @memberof module:api/items
 * @name GET /:itemId
 */
router.get('/:itemId', [
  param('itemId').isInt(),
  validatorErrors,
], itemController.get);

/**
 * @memberof module:api/items
 * @name GET /rent
 */
router.get('/:itemId/rent/:borrowerId/:duration', [
  param('itemId').isAlphanumeric(),
  param('borrowerId').isAlphanumeric(),
  param('duration').isInt(),
  validatorErrors,
], itemController.rent);

module.exports = router;
