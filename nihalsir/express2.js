const express = require("express");
const cors = require("cors");
//!Importing Routes
const { students } = require("./nihalsir/routes/students.routes");
const { teachers } = require("./nihalsir/routes/teachers.routes");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
//!for teachers
app.use("/teachers", teachers);

//!for students
app.use("/students", students);

app.listen(8080, () => {
  console.log("port started at http://localhost:8080");
});

// community middlewares
// cors()
//
