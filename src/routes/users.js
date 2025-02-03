const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const { validateRequest, validateObjectId, userValidationRules } = require('../validation/userValidation');

router.get('/', usersController.getAll);

router.get('/:id', [
  validateObjectId,
  validateRequest,
  usersController.getSingle
]);

router.post('/', [
  userValidationRules,
  validateRequest,
  usersController.createUser
]);

router.put('/:id', [
  validateObjectId,
  userValidationRules,
  validateRequest,
  usersController.updateUser
]);

router.delete('/:id', [
  validateObjectId,
  validateRequest,
  usersController.deleteUser
]);

module.exports = router;