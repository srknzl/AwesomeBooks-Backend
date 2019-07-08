const http = require("http");

const requestHandler = require('./routes'); 

const hostname = "localhost";
const port = 3000;

const server = http.createServer(requestHandler);

server.listen(port, hostname, () => {
  console.log(
    `Listening incoming connections on port http://${hostname}:${port}`
  );
});
