const express = require("express");
const path = require("path");

const rootDir = require("../utils/path.js");

const Router = express.Router();

const products = [];

Router.get("/add-product", (req, res, next) => {
  // console.log("In the another middleware");
  res.render("add-product", {
    pageTitle: "Add Product Page EJS",
  });
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
});
Router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  products.push({ title: req.body.title });
  res.redirect("/");
});

exports.routes = Router;
exports.products = products;
