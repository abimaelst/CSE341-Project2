// routes/services.js
const express = require('express')
const router = express.Router()
const { isAuthenticated } = require('../middleware/authenticate')

const servicesController = require('../controllers/services')
const { validateRequest, validateObjectId, serviceValidationRules } = require('../validation/serviceValidation');

router.get('/', isAuthenticated, servicesController.getAll);

router.get('/:id', [
  validateObjectId,
  validateRequest,
  servicesController.getSingle
]);

router.post('/', [
  serviceValidationRules,
  validateRequest,
  servicesController.createService
]);

router.put('/:id', [
  validateObjectId,
  serviceValidationRules,
  validateRequest,
  servicesController.updateService
]);

router.delete('/:id', [
  validateObjectId,
  validateRequest,
  servicesController.deleteService
]);

module.exports = router;