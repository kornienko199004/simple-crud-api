const http = require('http');
const { URL } = require('url');
const PersonsModel = require('./models/persons');
const Validator = require('./validators/index');

const persons = new PersonsModel();
const validator = new Validator();

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

  // console.log(req);
  console.log(req.path);
  console.log(req.method);
  console.log(req.url);
  // console.log(new URL(req.url).parse());

  const url = req.url.split('/');
  console.log(url);

  const route = url.slice(1, 2)[0];
  const param = url.slice(2)[0];

  console.log(route);
  console.log(param);

  if (route === 'person' && req.method === 'GET' && !param) {
    res.end(JSON.stringify(persons.getData()));
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
  }

  if (route === 'person' && req.method === 'POST' && !param) {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });

    req.on('end', () => {
      const row = persons.add(JSON.parse(data));
      res.end(JSON.stringify(row));
    });
  }

  if (route === 'person' && req.method === 'PUT' && param) {
    if (validator.validateId(param)) {
      const row = persons.getRowById(param);
      if (!row) {
        res.statusCode = 404;
        res.end();
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
  }

  // uuid.validate()
  // if (req.url.includes('/person') && req.method === 'GET') {
  //   let data = '';
  //   req.on('data', chunk => {
  //     data += chunk;
  //   });

  //   req.on('end', () => {
  //     const row = persons.add(JSON.parse(data));
  //     res.end(JSON.stringify(row));
  //   });
  // }

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
