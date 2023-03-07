const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;
let _db;

const connection = (cb) => {
  MongoClient.connect("mongodb://127.0.0.1:27017/mydb")
    .then((result) => {
      console.log("Successfully connected to MongoDB");
      _db = result.db();
      cb();
    })
    .catch((error) => {
      console.log("Error while connecting to MongoDb\n", error);
    });
};

const getDb = () => (_db ? _db : "No Database Found");

module.exports = { connection, getDb };
