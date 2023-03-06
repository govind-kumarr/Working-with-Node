const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const { get404 } = require("./controllers/error");
const { AdminRouter } = require("./routes/admin");
const ShopRoutes = require("./routes/shop");
const connection = require("./utils/db");

const app = express();
//!the path to the root directory
const root = require("./utils/path");

//!serving files statically
app.use(express.static(path.join(root, "public")));

//!Using Templating engines
app.set("view engine", "ejs");
app.set("views", "views");

//!json converter and bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

//!Admin Routes
app.use("/admin", AdminRouter);

//!Home Routes
app.use("/", ShopRoutes);

//!Error Route
app.use(get404);

connection((client) => {
  console.log("Connection established\n", client);
  console.log("App is running at port " + 3001);
  app.listen(3001);
});
