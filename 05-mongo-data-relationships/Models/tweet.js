// //mongo connection

const mongoose = require("mongoose");
const { Schema } = mongoose;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/relationships");
  console.log("Connection open!");
}

const userSchema = new Schema({
  userName: String,
  age: Number,
});

const tweetSchema = new Schema({
  text: String,
  likes: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const User = mongoose.model("User", userSchema);
const Tweet = mongoose.model("Tweet", tweetSchema);

const makeTweets = async () => {
//   const user = new User({
//     userName: "rodrigoenzohernandez",
//     age: 25,
//   });

    const user = await User.findOne({ userName: 'rodrigoenzohernandez'})

  const tweet2 = new Tweet({ text: "Captain, it's Wednesday", likes: 3000 });
  tweet2.user = user;

  tweet2.save();
};

// makeTweets();



const findTweet = async () =>{
    const t = await Tweet.find({})
    .populate('user', 'userName')
    .then (user => console. log(user))

}

findTweet()