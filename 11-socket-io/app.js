require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require(`mongoose`);
const bodyParser = require("body-parser");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const dbUrl = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

const server = app.listen(3000, () => {
  console.log(`server is running on port, ${server.address().port} `);
});

app.use(express.static(`${__dirname}/public/html`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

async function main() {
  await mongoose.connect(dbUrl);
  console.log("Connection open!");
}

main().catch((err) => console.log(err));

const Message = mongoose.model("Message", { name: String, message: String });

app.get("/messages", (req, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages);
  });
});
