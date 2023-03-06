const Cart = require("../model/cart");
const Product = require("../model/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

exports.addToCart = (req, res, next) => {
  const { productId } = req.body;
  Product.findById(productId, (product) => {
    Cart.saveToCart(productId, +product.price);
    res.redirect("/cart");
  });
};

exports.deleteFromCart = (req, res, next) => {
  const { prodId, productPrice } = req.body;
  Cart.deleteFromCart(prodId, productPrice);
  res.redirect("/cart");
};

exports.getProduct = (req, res, next) => {
  const { id } = req.params;
  Product.findById(id, (product) => {
    res.render("shop/product-detail", {
      pageTitle: "Product Detail",
      product,
      path: `/products`,
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getDetailedCart((cart) => {
    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      products: cart.products,
    });
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
