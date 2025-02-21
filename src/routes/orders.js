// routes/orders.js
const express = require('express')
const router = express.Router()
const { isAuthenticated } = require('../middleware/authenticate')

const ordersController = require('../controllers/orders')
const { validateRequest, validateObjectId, orderValidationRules } = require('../validation/orderValidation');

router.get('/', isAuthenticated, ordersController.getAll);

router.get('/:id', [
  validateObjectId,
  validateRequest,
  ordersController.getSingle
]);

router.post('/', [
  orderValidationRules,
  validateRequest,
  ordersController.createOrder
]);

router.put('/:id', [
  validateObjectId,
  orderValidationRules,
  validateRequest,
  ordersController.updateOrder
]);

router.delete('/:id', [
  validateObjectId,
  validateRequest,
  ordersController.deleteOrder
]);

module.exports = router;