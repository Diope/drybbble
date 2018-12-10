const validator = require('validator')
const isEmpty = require('./isEmpty');

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.username = !isEmpty(data.username) ? data.username : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password_confirm = !isEmpty(data.password_confirm) ? data.password_confirm : '';

  // USERNAME:
  if(!validator.isLength(data.username, { min: 3, max: 30 })) {
    errors.username = 'Username must be at least 3 characters in length';
  }
  if (validator.isEmpty(data.username)) {
    errors.username = "A username is required to access Drybbble"
  }

  // EMAIL:
  if(!validator.isEmail(data.email)) {
    errors.email = 'Email is not formatted correctly, please check the email and try again';
  }
  if(validator.isEmpty(data.email)) {
      errors.email = 'Email is required to access Drybbble';
  }

  if(!validator.isLength(data.password, {min: 6, max: 30})) {
    errors.password = 'Password must be at least ';
  }
  if(validator.isEmpty(data.password)) {
      errors.password = 'Password is required';
  }

  if(!validator.isLength(data.password_confirm, {min: 6, max: 30})) {
      errors.password_confirm = 'Password must have 6 chars';
  }
  if(!validator.equals(data.password, data.password_confirm)) {
      errors.password_confirm = 'Password and Confirm Password must match';
  }
  if(validator.isEmpty(data.password_confirm)) {
      errors.password_confirm = 'Please reenter your password for confirmation';
  }

  return {
      errors,
      isValid: isEmpty(errors)
  }
}