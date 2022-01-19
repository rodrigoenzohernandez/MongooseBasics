//mongo connection

const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/relationships");
  console.log("Connection open!");
}

//ONE TO FEW

const userSchema = new mongoose.Schema({
  first: String,
  last: String,
  addresses: [
    {
      _id: { id: false }, //This prevents of autocreated ID
      street: String,
      city: String,
      state: String,
      country: {
        type: String,
        required: true,
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);

const makeUser = async () => {
  const u = new User({
    first: "Harry",
    last: "Potter",
  });

  u.addresses.push({
    street: "Quiroga",
    city: "Lomas",
    state: "Buenos Aires",
    country: "Argentina",
  });

  const res = await u.save();

  console.log(res);
};


const addAdress = async (id) => {
    const user = await User.findById(id);
    user.addresses.push({
        street: "Alsina",
        city: "Temperley",
        state: "Buenos Aires",
        country: "Argentina",
      })
      const res = await user.save()
      console.log(res);
}

//makeUser();

addAdress('61e8354c5d70c61a5000a322')
