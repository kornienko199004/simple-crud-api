const uuid = require('uuid');

function Validator() {

};

Validator.prototype.validateId = function(id) {
  return uuid.validate(id);
}

module.exports = Validator;