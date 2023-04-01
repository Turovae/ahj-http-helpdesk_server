/* eslint-disable no-console */
const http = require('http');

const PORT = 7070;
const URL = 'http://localhost';

const server = http.createServer((req, res) => {
  const buffer = [];
  req.on('data', (chunk) => {
    buffer.push(chunk);
  });

  req.on('end', () => {
    console.log(Buffer.concat(buffer).toString().split('&'));
  });

  res.end('response');
});

server.listen(PORT, (err) => {
  if (err) {
    console.log(err);

    return;
  }

  console.log(`Server is listening to ${URL}:${PORT}`);
});
