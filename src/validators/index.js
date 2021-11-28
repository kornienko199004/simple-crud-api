const uuid = require('uuid');

function Validator() {

};

Validator.prototype.validateId = function(id) {
  return uuid.validate(id);
}

Validator.prototype.validateFields = function(data) {
  if (!data.hasOwnProperty('name') || !data.hasOwnProperty('age')) {
    return false;
  }

  return true;
}

module.exports = Validator;