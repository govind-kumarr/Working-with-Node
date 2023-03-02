const { Router } = require("express");

const teachers = Router();

teachers.post("/create", (req, res, next) => {
  res.send("Creating a new Teacher...");
  next();
});

teachers.put("/update", (req, res, next) => {
  res.send("Updating a Teacher...");
  next();
});

teachers.delete("/delete", (req, res, next) => {
  res.send("Deleting Teacher...");
  next();
});

teachers.get("/", (req, res, next) => {
  res.send("Sending Teachers...");
  next();
});

exports.teachers = teachers;
