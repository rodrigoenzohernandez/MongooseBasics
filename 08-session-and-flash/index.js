const express = require("express");
const app = express();
const session = require("express-session");
let counter;

const sessionOptions = {
  secret: "my-secret",
  resave: false,
  saveUninitialized: false,
};

app.use(session(sessionOptions));

app.get("/viewcount", (req, res) => {
  req.session.count ? (req.session.count += 1) : (req.session.count = 1);
  res.send(`You have visited this page ${req.session.count} times`);
});

app.get("/register", (req, res) => {
  const { username = "unknown" } = req.query;
  console.log(username);
  req.session.username = username;
  res.redirect('/greet')
});

app.get("/greet", (req, res) => {
    console.log(req.session.username);
  const { username } = req.session;
  res.send(`Hi, I'm ${username}`);
});

app.listen(3000, () => {
  console.log("SERVING");
});
