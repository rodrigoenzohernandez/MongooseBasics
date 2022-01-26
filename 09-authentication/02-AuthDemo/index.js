const express = require("express");
const app = express();
const User = require("./models/user");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

//mongo connection

const mongoose = require("mongoose");
const user = require("./models/user");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/authDemo");
  console.log("Connection open!");
}

app.use(bodyParser.json());

app.get("/secret", (req, res) => {
  res.send("This is secret");
});

app.post("/user", async (req, res) => {
  const newUser = await User.create({
    username: req.body.username,
    password: await bcrypt.hash(req.body.password, 12),
  });

  newUser.save();

  res.send(newUser);
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username });

  let logged = false;

  if (user) {
    logged = await bcrypt.compare(password, user.password);
  }

  logged
    ? res.send("Welcome")
    : res.status(401).send("User or password incorrect");
});

app.listen(3000, () => {
  console.log("SERVING YOUR APP!");
});
