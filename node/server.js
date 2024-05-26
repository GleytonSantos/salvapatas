const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    const htmlFile = 'index.html';
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    fs.createReadStream(htmlFile).pipe(res);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
