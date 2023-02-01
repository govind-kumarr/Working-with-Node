const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("hello world");
  } else if (req.url === "/reports") {
    res.end("reports");
  } else if ((req.url === "/notes", req.method === "POST")) {
    fs.readFile("./lecture.txt", { encoding: "utf8" }, (err, data) => {
      let str = "";
      req.on("data", (packet) => {
        str += packet;
      });
      req.on("end", () => {
        console.log(str);
      });
      if (!err) res.end(data);
      console.log(err);
    });
  } else if ((req.url = "/movies")) {
    // const movie = fs.readFileSync("./movies.txt", { encoding: "utf8" });
    const movieStream = fs.createReadStream("./movies.txt", {
      encoding: "utf8",
    });
    movieStream.pipe(res);
    // res.end(movie)
  } else {
    res.end("Invalid URL: " + req.url);
  }
});

server.listen(3000, () => {
  console.log("listening on port 3000");
});
