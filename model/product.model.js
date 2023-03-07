const { getDb } = require("../utils/db");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
module.exports = class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new ObjectId(id) : null;
    this.userId = userId;
  }
  save() {
    const db = getDb();
    if (this._id) {
      return db
        .collection("products")
        .updateOne(
          {
            _id: new ObjectId(this._id),
          },
          { $set: this }
        )
        .then((result) => result)
        .catch((error) => error);
    } else {
      return db
        .collection("products")
        .insertOne(this)
        .then((result) => result)
        .catch((error) => {
          console.log("Error while Inserting Product\n", error);
          return error;
        });
    }
  }
  static Delete(id) {
    const db = getDb();
    db.collection("products").deleteOne({ _id: mongodb.ObjectId(id) });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((result) => result)
      .catch((error) => error);
  }
  static findById(id) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(id) })
      .next()
      .then((result) => result)
      .catch((error) => error);
  }
};

function fetchAll(cb) {
  const db = getDb();
  db.collection("products")
    .find()
    .toArray()
    .then((result) => cb(result))
    .catch((error) => {
      console.log("Error while connecting to server\n", error);
      cb([]);
    });
}
