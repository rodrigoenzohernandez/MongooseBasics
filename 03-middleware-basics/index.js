const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(morgan("dev")); //logs every single request

//This middleware runs on each request

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

//This middleware runs only on the particular path /dogs

const hasNameMiddleware = require("./middlewares/hasNameQueryString");

app.use("/dogs", (req, res, next) => {
  console.log(`I love my beautiful dog ${req.query.name}`);
  next();
});

app.get("/", (req, res) => {
  res.send("HOME PAGE!");
});

app.get("/dogs", hasNameMiddleware, (req, res) => {
  res.send(`I love my beautiful dog ${req.query.name}`);
});

//This middleware only runs then nothing else run before

app.use((req, res) => {
  res.status(400).send("NOT FOUND");
});

app.listen(3000, () => {
  console.log("App is running on localhost:3000");
});
