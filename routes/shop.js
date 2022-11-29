const path = require("path");

const express = require("express");

const {
  getProducts,
  getCart,
  getCheckout,
  getIndex,
  getOrders
} = require("../controllers/shop");

const router = express.Router();

router.get("/", getIndex);

router.get("/products", getProducts);

router.get("/cart", getCart);

router.get('/orders',getOrders)

router.get("/checkout", getCheckout);

module.exports = router;
