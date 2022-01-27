const express = require("express");
const app = express();
const User = require("./models/user");
const bodyParser = require("body-parser");

const session = require("express-session");

const isLogged = require("./middlewares/isLogged");

const passport = require("passport");
const LocalStrategy = require("passport-local");

const sessionOptions = {
  secret: "my-secret",
  resave: false,
  saveUninitialized: false,
};

//mongo connection

const mongoose = require("mongoose");
const user = require("./models/user");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/passportDemo");
  console.log("Connection open!");
}

app.use(bodyParser.json());

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser()); //It means how it will be stored in the session
passport.deserializeUser(User.deserializeUser());

app.get("/secret", isLogged, (req, res) => {
  res.send("This is secret");
});

app.get("/actualuser", isLogged, (req, res) => {
  res.send(req.user);
});

app.post("/user", async (req, res) => {
  const user = new User({
    email: req.body.email,
    username: req.body.username,
  });

  const newUser = await User.register(user, req.body.password);

  //log in the user
  req.login(newUser, (err) => {
    if (err) return next(err);
    res.send(newUser);
  });
});

app.post("/login", passport.authenticate("local"), async (req, res) => {
  res.send("Logged");
});

app.post("/logout", async (req, res) => {
  req.logout();
  res.send("Logged out successfully");
});

app.listen(3000, () => {
  console.log("SERVING YOUR APP!");
});
