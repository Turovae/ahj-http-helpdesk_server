/* eslint-disable no-console */
const http = require('http');

const PORT = 7070;
// eslint-disable-next-line no-unused-vars
const URL = 'http://localchost';

const server = http.createServer((req, res) => {
  console.log(req.headers);

  res.end();
});

server.listen(PORT, (err) => {
  if (err) {
    console.log(err);

    return;
  }

  console.log('Server is listent');
});
