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
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  static getProducts = (cb) => {
    fs.readFile(p, { encoding: "utf8" }, (err, data) => {
      if (!err && data) cb(JSON.parse(data));
      else cb([]);
    });
  };

  static Delete(id) {
    console.log("Delete function called");
    getProducts((products) => {
      console.log(products, "Products");
      const newProducts = products.filter((elem) => elem.id != id);
      console.log(newProducts, "new Products");
      fs.writeFile(p, JSON.stringify(newProducts), (error) => {
        console.log("error while writing to the file", error);
      });
    });
  }

  save() {
    getProducts((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id == this.id
        );
        let updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;

        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          if (err) console.log("Error Occured while writing a file\n", err);
        });
      } else {
        this.id = Math.random() * 10000;
        this.id = Math.floor(this.id);
        products.push(this);

        fs.writeFile(p, JSON.stringify(products), (err) => {
          if (err) console.log("Error Occured while writing a file\n", err);
        });
      }
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
