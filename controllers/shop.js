const Cart = require("../model/cart");
const Product = require("../model/product.model");
const User = require("../model/user.model");
// const Product = require("../model/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((error) => {
      console.log("Error while fetching products\n", error);
    });
};

exports.addToCart = (req, res, next) => {
  const { productId, productPrice } = req.body;
  const User = req.user;
  User.addToCart(productId, productPrice)
    .then((newCart) => {
      console.log(newCart);
      res.redirect("/cart");
    })
    .catch((error) => {
      console.log("error occured while adding to cart\n", error);
    });
};

exports.deleteFromCart = (req, res, next) => {
  const { prodId, productPrice } = req.body;
  const User = req.user;
  User.Delete(prodId, productPrice)
    .then((result) => {
      res.redirect("/");
    })
    .catch((error) => {
      res.send("Error while deleting product from Cart");
    });
};

exports.getProduct = (req, res, next) => {
  const { id } = req.params;
  Product.findById(id)
    .then((product) => {
      res.render("shop/product-detail", {
        pageTitle: "Product Detail",
        product,
        path: `/products`,
      });
    })
    .catch((err) => console.log("Product not found\n", err));
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((error) => console.log("Error while fetching products\n", error));
};

exports.getCart = (req, res, next) => {
  const User = req.user;
  User.getDetailedCart()
    .then((products) => {
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
      });
    })
    .catch((error) => {
      console.log("Error while fetching cart products", error);
      res.send("Error while fetching cart products");
    });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
