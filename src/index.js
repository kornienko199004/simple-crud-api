require('dotenv').config()
const http = require('http');
const personRoutes = require('./routes/persons');

const hostname = process.env.HOST;
const port = process.env.PORT;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

  try {
    personRoutes(req, res);
  } catch(error) {
    res.statusCode = 500;
    res.end('Something went wrong');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
