const express = require("express");
const {
  getAddProduct,
  postAddProduct,
  getProducts,
  getEditProduct,
  postEditProduct,
  deleteProduct,
} = require("../controllers/admin");

const AdminRouter = express.Router();

AdminRouter.post("/delete-product/:productId", deleteProduct);

AdminRouter.get("/edit-product/:productId", getEditProduct);

AdminRouter.post("/edit-product", postEditProduct);

AdminRouter.get("/add-product", getAddProduct);

AdminRouter.get("/products", getProducts);

AdminRouter.post("/add-product", postAddProduct);

exports.AdminRouter = AdminRouter;
