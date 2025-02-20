const express = require('express')
const router = express.Router()
const { isAuthenticated } = require('../middleware/authenticate')

const productsController = require('../controllers/products')
const { validateRequest, validateObjectId, productValidationRules } = require('../validation/productValidation');

router.get('/', isAuthenticated, productsController.getAll);

router.get('/:id', [
  validateObjectId,
  validateRequest,
  productsController.getSingle
]);

router.post('/', [
  productValidationRules,
  validateRequest,
  productsController.createProduct
]);

router.put('/:id', [
  validateObjectId,
  productValidationRules,
  validateRequest,
  productsController.updateProduct
]);

router.delete('/:id', [
  validateObjectId,
  validateRequest,
  productsController.deleteProduct
]);


module.exports = router