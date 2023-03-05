const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/path");

const p = path.join(rootDir, "data", "product.json");
const pathToCart = path.join(rootDir, "data", "cart.json");

const getProducts = (cb) => {
  fs.readFile(p, { encoding: "utf8" }, (err, data) => {
    if (!err && data) cb(JSON.parse(data));
    else cb([]);
  });
};


module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = Math.random() * 10000;
    this.id = Math.floor(this.id);
    getProducts((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        if (err) console.log("Error Occured while writing a file\n", err);
      });
    });
  }

  static fetchAll(cb) {
    getProducts(cb);
  }

  static findById(id, cb) {
    getProducts((products) => {
      const singleProduct = products.find((elem) => elem.id == id);
      cb(singleProduct);
    });
  }
};
