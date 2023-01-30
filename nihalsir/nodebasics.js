const fs = require("fs");

/*
fs.readFile("./hello.txt", { encoding: "utf-8" }, (err, data) => {
  if (err) console.log(err);
  else console.log(data);
});

let result = fs.readFileSync("./lecture.txt", { encoding: "utf-8" });

console.log(result);

console.log("first");

*/
fs.writeFile(
  "./test.txt",
  "Hello World!",
  { encoding: "utf-8" },
  (err) => err && console.log(err)
);

fs.appendFile(
  "./test.txt",
  "\nHello again",
  { encoding: "utf-8" },
  (err) => err && console.log(err)
);

fs.readFile("./test.txt", { encoding: "utf-8" }, (err, data) => {
  if (err) console.log(err);
  else console.log(data);
});
// fs.readFile;
