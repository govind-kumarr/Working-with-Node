const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.text());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/students", (req, res) => {
  const data = fs.readFileSync("./db.json", "utf-8");
  const parsedData = JSON.parse(data);
  const students = JSON.stringify(parsedData.students);
  console.log(students);
  res.send("...In Progress");
});

app.post("/enterstudent", (req, res) => {
  let data = fs.readFileSync("./db.json", "utf8");
  data = JSON.parse(data);
  data.students.push(req.body);
  fs.writeFileSync("./db.json", JSON.stringify(data));
  console.log(req.body);
  res.end("data accepted");
});

app.post("/add_details", (req, res) => {
  fs.writeFileSync("./sample.txt", req.body, "utf-8");
  res.end("details added successfully");
});

app.get("/details", (req, res) => {
  let data = fs.readFileSync("./sample.txt", "utf-8");
  res.send(data);
});

app.listen(8080, () => {
  console.log("listening on port 8080");
});
