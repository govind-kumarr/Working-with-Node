const { getDb } = require("../utils/db");

const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email) {
    this.name = username;
    this.email = email;
  }

  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then((result) => result)
      .catch((error) => error);
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
