const http = require("http");

const express = require("express");

const app = express();

app.use((request, response, next) => {
  next();
});

app.use("/users", (request, response, next) => {
  response.send(`<ul>
  <li>Govind Kumar</li>
  <li>Shravani Mishra</li>
  <li>Santosh Yadav</li>
  </ul>`);
});

app.use("/", (request, response, next) => {
  console.log("In the first middleware");
  next();
});

app.listen(3000);
