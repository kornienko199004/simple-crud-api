
const PersonsModel = require('../models/persons');
const Validator = require('../validators/index');

const persons = new PersonsModel();
const validator = new Validator();

const personRoutes = (req, res) => {
  const url = req.url.split('/');
  const route = url.slice(1, 2)[0];
  const param = url.slice(2)[0];

  if (route === 'person' && req.method === 'GET' && !param) {
    res.end(JSON.stringify(persons.getData()));
    return;
  }

  if (route === 'person' && req.method === 'GET' && param) {
    if (validator.validateId(param)) {
      const row = persons.getRowById(param);
      if (!row) {
        res.statusCode = 404;
      }
      res.end(JSON.stringify(row));
    } else {
      res.statusCode = 400;
      res.end('Wrong request');
    }
    return;
  }

  if (route === 'person' && req.method === 'POST' && !param) {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });

    req.on('end', () => {
      if (!validator.validateFields(JSON.parse(data))) {
        res.statusCode = 400;
        res.end();
      } else {
        const row = persons.add(JSON.parse(data));
        res.statusCode = 201;
        res.end(JSON.stringify(row));
      }
    });
    return;
  }

  if (route === 'person' && req.method === 'PUT' && param) {
    if (validator.validateId(param)) {
      const row = persons.getRowById(param);
      if (!row) {
        res.statusCode = 404;
        res.end();
        return;
      }
      
      let data = '';
      req.on('data', chunk => {
        data += chunk;
      });

      req.on('end', () => {
        const row = persons.update(param, JSON.parse(data));
        res.end(JSON.stringify(row));
      });
    } else {
      res.statusCode = 400;
      res.end('Wrong request');
    }
    return;
  }

  if (route === 'person' && req.method === 'DELETE' && param) {
    if (validator.validateId(param)) {
      const row = persons.getRowById(param);
      if (!row) {
        res.statusCode = 404;
        res.end();
      } else {
        persons.deleteById(param);
        res.statusCode = 204;
        res.end();
      }
    } else {
      res.statusCode = 400;
      res.end('Wrong request');
    }
    return;
  }
  res.statusCode = 404;
  res.end('Wrong request');
};

module.exports = personRoutes;