const express = require("express");

const router = express.Router();

router.use("/", (request, response, next) => {
  // console.log("In the another MiddleWare");
  response.send("<h1>Hello from Express.js</h1>");
  next();
});

module.exports = router;
