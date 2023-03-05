const express = require("express");
const {
  getAddProduct,
  postAddProduct,
  getProducts,
} = require("../controllers/admin");

const AdminRouter = express.Router();

AdminRouter.get("/add-product", getAddProduct);

AdminRouter.get("/products", getProducts);

AdminRouter.post("/add-product", postAddProduct);

exports.AdminRouter = AdminRouter;
