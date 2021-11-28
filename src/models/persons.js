const { v1: uuidv1 } = require('uuid');

function Persons() {
  this.data = [];
}

Persons.prototype.getData = function() {
  return this.data;
}

Persons.prototype.add = function(row) {
  row.id = uuidv1();
  this.data.push(row);
  return row;
}

module.exports = Persons;