const http = require("http");

const bodyParser = require("body-parser");

const path = require("path");

const express = require("express");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

const { routes, products } = require("./routes/admin.js");

const shopRoutes = require("./routes/shop.js");

app.use("/admin", routes);

app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found EJS" });
});

app.listen(3000, () => {
  console.log("server started");
});
