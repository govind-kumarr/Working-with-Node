const path = require("path");

const express = require("express");

const router = express.Router();

const rootDir = require("../utils/path.js");

const { products } = require("./admin.js");

router.get("/", (request, response, next) => {
  console.log("products", products);
  // response.sendFile(path.join(rootDir, "views", "shop.html"));
  response.render("shop", { products, docTitle: "Shop" });
});

module.exports = router;
