const express = require("express");

const path = require("path");
const rootDir = require("../utils/path.js");

const Router = express.Router();

Router.get("/", (req, res, next) => {
  // console.log("In the another middleware");

  res.sendFile(path.join(rootDir,  "views", "shop.html"));
});

module.exports = Router;
