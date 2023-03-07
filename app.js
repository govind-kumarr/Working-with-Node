const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const { get404 } = require("./controllers/error");
const User = require("./model/user.model");
const { AdminRouter } = require("./routes/admin");
const ShopRoutes = require("./routes/shop");
const { connection, getDb } = require("./utils/db");

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

//!Verifying User
app.use((req, res, next) => {
  User.findById("6407166a4831c738a9fbbe1e")
    .then((user) => {
      const { _id, name, email, cart } = user;
      req.user = new User(_id, name, email, cart);
      next();
    })
    .catch((error) => console.log("Error User not found:\n" + error));
});

//!Admin Routes
app.use("/admin", AdminRouter);

//!Home Routes
app.use("/", ShopRoutes);

//!Error Route
app.use(get404);

connection(() => {
  console.log("App is running at port " + 3001);
  app.listen(3001);
});
