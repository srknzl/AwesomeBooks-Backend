const http = require("http");
const fs = require("fs");

const hostname = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {
  //console.log(req.url, req.method, req.headers);
  if (req.url == "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<body>");
    res.write("<head><title>First page</title></head>");
    res.write("<h1>Hello World!</h1>");
    res.write("<h2>Add a book!</h2>");
    res.write("<form action='/admin/add-product' method='POST'>");
    res.write("<input type='text' name='title'>");
    res.write("<button type='submit'>Submit</button>");
    res.write("</form>");
    res.write("</body>");
    return res.end("</html>");
  } else if (req.url == "/admin/add-product" && req.method == "POST") {
    // where to parse and write to a file
    const body = [];
    req.on("data", chunk => {
      body.push(chunk);
    });
    req.on('end',()=>{
      const parsedBody = Buffer.concat(body).toString();
      fs.writeFileSync("message.txt", parsedBody.split('=')[1]);
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
  res.write("<html>");
  res.write("<body>");
  res.write("<head><title>First page</title></head>");
  res.write("<h1>Hello World!</h1>");
  res.write("</body>");
  res.end("</html>");
});

server.listen(port, hostname, () => {
  console.log(
    `Listening incoming connections on port http://${hostname}:${port}`
  );
});
