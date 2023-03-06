const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/path");
const Product = require("./product");

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
  static getDetailedCart(cb) {
    getCart((cart) => {
      Product.getProducts((products) => {
        let newProducts = cart?.products.map((product1) => {
          let p = products.find((product2) => product2.id == product1.id);
          p = { ...p, qty: product1.qty };
          return p;
        });
        cart.products = newProducts;
        cb(cart);
      });
    });
  }
  static deleteFromCart(id, productPrice) {
    getCart((cart) => {
      let newCartProducts = cart.products.filter((elem) => elem.id != id);
      let thatProduct = cart.products.find((elem) => elem.id == id);
      let newTotal = cart.totalPrice - thatProduct.qty * productPrice;
      let newCart = {
        products: newCartProducts,
        totalPrice: newTotal,
      };

      fs.writeFile(pathToCart, JSON.stringify(newCart), (err) => {
        if (err) console.log("Error while writing to cart\n", err);
      });
    });
  }
};
