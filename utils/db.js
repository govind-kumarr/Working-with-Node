const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;
let _db;

const connection = (cb) => {
  MongoClient.connect(
    "mongodb+srv://govind:kumar@cluster0.2ekrk1q.mongodb.net/mydb?retryWrites=true&w=majority"
  )
    .then((result) => {
      console.log("Successfully connected to MongoDB");
      _db = result.db();
    })
    .catch((error) => {
      console.log("Error while connecting to MongoDb\n", error);
    });
};

module.exports = connection;
