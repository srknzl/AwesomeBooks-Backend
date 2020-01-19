const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(
      '<html></body><h1>Welcome</h1><form action="/create-user" method="POST"><input name="username" type="text"><button type="submit">Submit</button></form></body></html>'
    );
    return res.end();
  } else if (req.url === "/users") {
    res.setHeader("Content-Type", "text/html");
    res.write(
      "<html></body><ul><li>User1</li><li>User2</li><li>User3</li></ul></body></html>"
    );
    return res.end();
  } else if (req.url === "/create-user") {
    const body = [];
    req.on('data',chunk =>{
      body.push(chunk);
    });
    return req.on('end', ()=>{
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody.split('=')[1]);
      res.setHeader("Location", "/");
      res.statusCode = 302;
      res.end();

    });
    
  }
});

server.listen(3000, "localhost");
