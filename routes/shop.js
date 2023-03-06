const express = require("express");
const {
  getProducts,
  getCart,
  getOrders,
  getCheckout,
  getIndex,
  getProduct,
  addToCart,
  deleteFromCart,
} = require("../controllers/shop");

const ShopRoutes = express.Router();

ShopRoutes.get("/", getIndex);

ShopRoutes.get("/products", getProducts);

ShopRoutes.get("/products/:id", getProduct);

ShopRoutes.get("/cart", getCart);

ShopRoutes.post("/delete-cart", deleteFromCart);

ShopRoutes.post("/cart", addToCart);

ShopRoutes.get("/orders", getOrders);

ShopRoutes.get("/checkout", getCheckout);

module.exports = ShopRoutes;
