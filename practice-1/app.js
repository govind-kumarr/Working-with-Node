const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

const db = require("./utils/database.js");

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");



app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes.route);
app.use(shopRoutes);

app.use((request, response, next) => {
  response.status(404).render("404", { docTitle: "404 Error Page Not Found" });
});

app.listen(3000);
