const express = require("express");
const app = express();
const User = require("./models/user");
const bodyParser = require("body-parser");

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
  console.log(req.body.username);
  console.log(req.body.password);

  const newUser = await User.create({
    username: req.body.username,
    password: req.body.password,
  });

  newUser.save();

  res.send(newUser);
});

app.listen(3000, () => {
  console.log("SERVING YOUR APP!");
});
