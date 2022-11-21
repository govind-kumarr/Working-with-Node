const express = require("express");

const router = express.Router();

router.use("/add-product", (request, response, next) => {
  response.send(`<form action='/product' method='POST' >
  <input type='text' name='title' />
  <button type='submit' >Add Product</button>
  </form>`);
  // console.log("In the MiddleWare");
  // next();
});

router.use("/product", (request, response, next) => {
  console.log(request.body);
  response.redirect("/");
});

module.exports = router;
