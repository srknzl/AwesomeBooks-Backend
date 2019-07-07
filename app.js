const http = require("http");

const hostname = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<h1>Hello World!</h1>");
});

server.listen(port, hostname, () => {
  console.log(
    `Listening incoming connections on port http://${hostname}:${port}`
  );
});
