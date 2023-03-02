const express = require("express");
const jwt = require("jsonwebtoken");
const { connection, Student } = require("./db");
require("dotenv").config();

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  let student = req.body;
  try {
    // console.log(student);
    student = new Student(student);
    await student.save();
    res.send("added the student successfully");
  } catch (err) {
    console.log("Error saving the student");
    console.log(err);
    res.send("error creating student");
  }
});

app.post("/login", async (req, res) => {
  const query = req.body;
  console.log("got logn request");
  try {
    if (query.email && query.password) {
      const result = await Student.find(query);

      if (result.length > 0) {
        const token = jwt.sign({ foo: "bar" }, "itssecret");
        res.send({ msg: "login success", token });
      } else {
        res.send("login failure");
      }
    }
  } catch (err) {
    console.log("Error occured while trying to login");
    console.log(err);
    res.statusCode(404).send("Login failed");
  }
});

app.get("/about", (req, res) => {
  res.send("About us data");
});
app.get("/weather", (req, res) => {
  // console.log(req.headers);
  const token = req.headers["authorization"];
  try {
    const decode = jwt.verify(token, "itssecret");
    console.log(decode);
    decode
      ? res.send("Weather data of your city")
      : res.send("Please login to access weather");
  } catch (err) {
    console.log(err);
    res.send("Error please login to access weather");
  }
});
app.get("/purchased", (req, res) => {
  const token = req.headers["authorization"];
  try {
    const decode = jwt.verify(token, "itssecret");
    // console.log(decode);
    decode
      ? res.send("Your Pruchased data is available")
      : res.send("Please login to access your purchased data");
  } catch (err) {
    console.log(err);
    res.send("Error please login to access your purchased data");
  }
});
app.get("/contact", (req, res) => {
  res.send("contact data of your city");
});

app.get("/", (req, res) => {
  res.send("Welcome to the application");
});

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connection established at " + process.env.port);
  } catch (err) {
    console.log("Error connecting to " + process.env.port);
  }
});
