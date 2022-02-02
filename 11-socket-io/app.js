require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const mongoose = require(`mongoose`);

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const dbUrl = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;






async function mongooseConnect() {
  await mongoose.connect(dbUrl);
  console.log("Connection open!");
}


const Message = mongoose.model("Message", { name: String, message: String });

app.get("/messages", (req, res) => {

  try {
    Message.find({}, (err, messages) => {
      res.send(messages);
    });
  } catch (error) {
    console.log(error);
  }


});
app.post("/messages", (req, res) => {

  try {
    var message = new Message(req.body);
    message.save((err) => {
      if (err) sendStatus(500);
      io.emit("message", req.body);
      res.sendStatus(200);
    });
  } catch (error) {
    console.log(error);
  }


});


io.on("connection", () => {
  console.log("a user is connected");
});

mongooseConnect().catch((err) => console.log(err));

const server = http.listen(3000, () => {
  console.log(`server is running on port, ${server.address().port} `);
});
