// const Product = require("../model/product");

const Product = require("../model/product.model");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(
    title,
    price,
    description,
    imageUrl,
    null,
    req.user._id
  );
  product.save();
  res.redirect("/");
};

exports.getEditProduct = (req, res, next) => {
  const { productId } = req.params;
  Product.findById(productId)
    .then((product) => {
      res.render("admin/edit-product", {
        pageTitle: "Add Product",
        path: "admin/add-product",
        editing: true,
        product,
      });
    })
    .catch((error) => {
      console.log("Error while executing findById\n", error);
      res.render("/");
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const updatedProduct = new Product(
    updatedTitle,
    updatedPrice,
    updatedDesc,
    updatedImageUrl,
    prodId
  );
  updatedProduct
    .save()
    .then((result) => {
      console.log("result", result);
      res.redirect("/admin/products");
    })
    .catch((error) => {
      console.log("error", error);
      res.redirect("/");
    });
};

exports.deleteProduct = (req, res, next) => {
  const { productId } = req.params;
  Product.Delete(productId);
  res.redirect("/admin/products");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((error) => {
      console.log("Error While fetching products from Database\n" + error);
      res.redirect("/");
    });
};
