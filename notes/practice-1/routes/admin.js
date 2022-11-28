const path = require("path");

const express = require("express");

const router = express.Router();

const rootDir = require("../utils/path.js");

const products = [];

router.get("/add-product", (request, response, next) => {
  response.sendFile(path.join(rootDir, "views", "add-product.html"));
});

router.post("/product", (request, response, next) => {
  // console.log(request.body);
  products.push({ title: request.body.title });
  response.redirect("/");
});

exports.route = router;
exports.products = products;
