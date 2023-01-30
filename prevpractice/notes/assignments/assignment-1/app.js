const http = require("http");

const myServer = http.createServer((req, res) => {
  const { url, method } = req;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>My First Page</title></head>");
    res.write(
      "<body><form action='/create-user' method='POST' > <input type='text' name='username' placeholder='Enter User Name Here...'/> <button type='submit' >submit</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/users" && method === "POST") {
    res.write("<html>");
    res.write("<head><title>My First Page</title></head>");
    res.write(
      `<body>
        <ul>
        <li>Govind Kumar</li>
        <li>Shravani Mishra</li>
        <li>Santosh Yadav</li>
        <li>Yash Kuthiyal</li>
        <li>Avinash</li>
        </ul>
      </body>`
    );
    res.write("</html>");
  }
  if (url === "/create-user" && method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      console.log(Buffer.concat(body).toString());
    });
  }
});

myServer.listen(3000);
