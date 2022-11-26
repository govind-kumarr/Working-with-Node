const express = require("express");

const path = require("path");
const rootDir = require("../utils/path.js");

const Router = express.Router();
const { products } = require("./admin.js");
Router.get("/", (req, res, next) => {
  // console.log("In the another middleware");
  res.render("shop", {
    pageTitle: "Shop Page EJS",
    products,
  });
  console.log(products);
  // res.sendFile(path.join(rootDir, "views", "shop.html"));
});

module.exports = Router;
