const express = require("express");
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
  try {
    if (query.email && query.password) {
      const result = await Student.find(query);
      if (result.length > 0) {
        console.log(result);
        res.send("login success");
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
  res.send("Weather data of your city");
});
app.get("/purchased", (req, res) => {
  res.send("purchasing data of your city");
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
