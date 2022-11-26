const http = require("http");
const bodyParser = require("body-parser");

const express = require("express");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const adminRoutes = require("./routes/admin.js");

const shopRoutes = require("./routes/shop.js");

app.use("/admin", adminRoutes);

app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).send(`<h1>404 Page Not Found</h1>`);
});
app.listen(3000, () => {
  console.log("server started");
});
