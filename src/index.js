const http = require('http');
const PersonsModel = require('./models/persons');

const persons = new PersonsModel();

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

  // console.log(req);
  console.log(req.path);
  console.log(req.method);
  console.log(req.url);

  if (req.url === '/person' && req.method === 'GET') {
    res.end(JSON.stringify(persons.getData()));
  }
  if (req.url === '/person' && req.method === 'POST') {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });

    req.on('end', () => {
      const row = persons.add(JSON.parse(data));
      res.end(JSON.stringify(row));
    });
  }

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
