const http = require("http");

const server = http.createServer((req, res)=>{
  console.log(req);
});

server.listen(8080);
console.log(`Listening incoming connections on port ${server.address().port}`);
