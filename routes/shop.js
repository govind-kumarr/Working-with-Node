const express = require("express");
const {
  getProducts,
  getCart,
  getOrders,
  getCheckout,
  getIndex,
  getProduct,
  addToCart,
} = require("../controllers/shop");

const ShopRoutes = express.Router();

ShopRoutes.get("/", getIndex);

ShopRoutes.get("/products", getProducts);

ShopRoutes.get("/products/:id", getProduct);

ShopRoutes.get("/cart", getCart);

ShopRoutes.post("/cart", addToCart);

ShopRoutes.get("/orders", getOrders);

ShopRoutes.get("/checkout", getCheckout);

module.exports = ShopRoutes;
