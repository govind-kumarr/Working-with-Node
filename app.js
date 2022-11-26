const http = require("http");

const bodyParser = require("body-parser");

const path = require("path");

const express = require("express");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

const adminRoutes = require("./routes/admin.js");

const shopRoutes = require("./routes/shop.js");

app.use("/admin", adminRoutes);

app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});
app.listen(3000, () => {
  console.log("server started");
});
