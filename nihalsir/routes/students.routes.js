const { Router } = require("express");

const students = Router();

students.post("/create", (req, res, next) => {
  res.send("Creating a new student...");
  next();
});

students.put("/update", (req, res, next) => {
  res.send("Updating a student...");
  next();
});

students.delete("/delete", (req, res, next) => {
  res.send("Deleting a student...");
  next();
});

students.get("/:id", (req, res, next) => {
  const id = req.params.id;
  res.send(`Sending student data of ${id}`);
  next();
});
students.get("/", (req, res, next) => {
  res.send(`Sending data of all students...`);
next();                                    
});

exports.students = students;
