const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/path");

const pathToCart = path.join(rootDir, "data", "cart.json");

const getCart = (cb) => {
  fs.readFile(pathToCart, { encoding: "utf8" }, (err, data) => {
    if (!err && data) cb(JSON.parse(data));
    else cb([]);
  });
};

module.exports = class Cart {
  static saveToCart(id, productPrice) {
    fs.readFile(pathToCart, { encoding: "utf-8" }, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err && fileContent) cart = JSON.parse(fileContent);

      //Analyze the cart => Find Existing product
      const existingProductInd = cart.products.findIndex(
        (product) => product.id == id
      );
      const existingProduct = cart.products[existingProductInd];

      let updatedProduct;

      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty++;
        cart.products[existingProductInd] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice += productPrice;

      fs.writeFile(pathToCart, JSON.stringify(cart), (err) => {
        if (err) console.log(err);
      });
    });
  }
};
