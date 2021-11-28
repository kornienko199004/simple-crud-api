const { v1: uuidv1 } = require('uuid');

function Persons() {
  this.data = [];
}

Persons.prototype.getData = function() {
  return this.data;
}

Persons.prototype.getRowById = function(id) {
  return this.data.find((item) => item.id === id);
}

Persons.prototype.update = function(id, row) {
  const index = this.data.findIndex((item) => item.id === id);
  const updatedRow = { id, ...row };
  this.data[index] = updatedRow;
  return updatedRow;
}

Persons.prototype.add = function(row) {
  row.id = uuidv1();
  this.data.push(row);
  return row;
}

module.exports = Persons;