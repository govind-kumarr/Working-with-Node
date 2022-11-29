const fs = require("fs");
const path = require("path");

const rootDir = require("../util/path.js");

const p = path.join(rootDir, "data", "cart.json");

module.exports = class Cart {
  static addProduct(id, productPrice) {
    console.log(id, productPrice);

    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };

      if (!err) cart = JSON.parse(fileContent);

      const existingProductIndex = cart.products.find((prod) => prod.id === id);

      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;

      if (existingProductIndex) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }

      cart.totalPrice += productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => console.log(err));
      console.log(cart, "cart");
    });
  }
};
