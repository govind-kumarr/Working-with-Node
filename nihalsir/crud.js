const express = require("express");
const { connection, User, userSchema } = require("./db");
require("dotenv").config();

const app = express();

//!middlewares
app.use(express.json());

app.delete("/users_delete/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    await User.findByIdAndDelete({ _id: userId });
    console.log("deleted user successfully");
    res.send("deleted user successfully");
  } catch (err) {
    console.log("Error deleting user");
    res.send("user is not deleted");
  }
});

app.post("/createuser", async (req, res) => {
  let user = req.body;
  try {
    user = new User(user);
    await user.save();
    res.send("data saved successfully");
  } catch (err) {
    console.log("Error saving data");
    console.log(err);
  }
});

app.patch("/edituser/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const payload = req.body;

    const query = await User.findByIdAndUpdate({ _id: userId }, payload);
    console.log(query);

    res.send("Successfully updated", "\n", updated_data);
  } catch (err) {
    res.send("Error updating the user");
    console.log("Error while Updating user", "\n", err);
  }
  res.send("trying update...");
});

app.get("/users", async (req, res) => {
  let users,
    query = req.query;
  try {
    users = await User.find(query);
    res.send(users);
  } catch (err) {
    console.log("Error sending data");
    res.send("Error while getting users");
    console.log(err);
  }
});

app.get("/", async (req, res) => {
  console.log(res.send("Welcome to the app!"));
});

app.listen(8080, async () => {
  try {
    await connection;
    console.log(`connection established at ${process.env.port}`);
  } catch (err) {
    console.log("Error connecting to database");
    console.log(err);
  }
  console.log("Port started at 8080");
});
