const express = require('express')
const app = express()
const User = require('./models/user')

//mongo connection

const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/authDemo");
  console.log("Connection open!");
}

app.get('/secret', (req, res) => {
    res.send('This is secret')
})

app.post('/user', (req, res) => {
    res.send('This is secret')
})


app.listen(3000, () => {
    console.log("SERVING YOUR APP!")
})