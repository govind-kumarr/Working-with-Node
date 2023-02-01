require("dotenv").config();
const mongoose = require("mongoose");

const connection = mongoose.connect(`${process.env.address}`);

const userSchema = mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: String,
    age: Number,
    mobile_no: Number,
  },
  {
    version_key: false,
  }
);

const Student = mongoose.model("students", userSchema);

module.exports = { connection, Student };
