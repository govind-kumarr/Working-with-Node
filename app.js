const http = require("http");

const express = require("express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin.js");

const homeRoute = require("./routes/shop.js");
const { response } = require("express");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRoutes);

app.use(homeRoute);

app.use((request, response, next) => {
  response.status(404).send("<h1>404 Page Not Found</h1>");
});

app.listen(3000);
