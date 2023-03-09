const { getDb } = require("../utils/db");

const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

class User {
  constructor(id, username, email, cart) {
    this._id = id;
    this.name = username;
    this.email = email;
    this.cart = cart;
  }

  save() {
    const db = getDb();
    if (this._id) {
      return db
        .collection("user")
        .updateOne({ _id: this._id }, { $set: this })
        .then((result) => result)
        .catch((error) => error);
    } else {
      return db
        .collection("user")
        .insertOne(this)
        .then((result) => result)
        .catch((error) => error);
    }
  }

  addToCart(productId, productPrice) {
    productId = new ObjectId(productId);
    let newQty = 1;
    if (this.cart.items.length == 0) {
      this.cart.items = [{ productId, qty: newQty, productPrice }];
      this.cart.totalPrice = +productPrice;
    } else {
      let index = this.cart.items.findIndex(
        (elem) => elem.productId + "" == productId + ""
      );
      let found = this.cart.items[index];
      if (index != -1) {
        this.cart.items[index] = { ...found, qty: found.qty + 1 };
        this.cart.totalPrice += +productPrice;
      } else {
        this.cart.items.push({ productId, qty: newQty, productPrice });
        this.cart.totalPrice += +productPrice;
      }
    }
    return this.save();
  }

  getDetailedCart() {
    const db = getDb();
    const productIds = this.cart.items.map((item) => item.productId);
    return db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        let newProducts = products.map((p) => {
          return {
            ...p,
            qty: this.cart.items.find(
              (elem) => "" + elem.productId == "" + p._id
            ).qty,
          };
        });
        return newProducts;
      })
      .catch((error) => {
        console.log("Error while loading cart products\n", error);
        return er;
      });
  }
  Delete(productId, productPrice) {
    const db = getDb();
    console.log(productId, productPrice);
    console.log(this.cart.items);
    const thatProductIndex = this.cart.items.findIndex(
      (elem) => elem["productId"] + "" == new ObjectId(productId) + ""
    );
    this.cart.totalPrice -=
      this.cart.items[thatProductIndex].qty * productPrice;
    this.cart.items = this.cart.items.filter(
      (elem, ind) => ind != thatProductIndex
    );

    return db
      .collection("user")
      .updateOne({ _id: this._id }, { $set: this })
      .then((user) => user)
      .catch((err) => err);
  }

  static findById(id) {
    const db = getDb();
    return db
      .collection("user")
      .find({ _id: new ObjectId(id) })
      .next()
      .then((result) => {
        // console.log("user is", result);
        return result;
      })
      .catch((error) => {
        // console.log("Error while getting user", error);
        return error;
      });
  }
}

module.exports = User;
