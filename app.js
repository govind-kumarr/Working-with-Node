const http = require("http");

const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>My First Page</title></head>");
    res.write(
      "<body><form action='/message' method='POST' > <input type='text' name='message'/> <button type='submit' >submit</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if ((url = "/message" && methhod === "POST")) {
    fs.writeFile("message.txt", "DUMMY");
    
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);
