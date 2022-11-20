const http = require("http");

const express = require("express");

const app = express();

app.use("/", (request, response, next) => {
  console.log("In the MiddleWare");
  next();
});

app.use((request, response, next) => {
  console.log("In the another MiddleWare");
  next();
});

app.use((request, response, next) => {
  console.log("In the third MiddleWare");
  response.send("<h1>Hello from Express.js</h1>");
});

app.listen(3000);
