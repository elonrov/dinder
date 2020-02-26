const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateUserInput(data) {
  let errors = {};

  data.email = validText(data.email) ? data.email : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  return {
    errors, 
    isValid: Object.keys(errors).length === 0
  }
}