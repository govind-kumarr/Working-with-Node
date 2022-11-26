const express = require("express");
const path = require("path");

const rootDir = require("../utils/path.js");

const Router = express.Router();

Router.get("/add-product", (req, res, next) => {
  // console.log("In the another middleware");
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});
Router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = Router;
