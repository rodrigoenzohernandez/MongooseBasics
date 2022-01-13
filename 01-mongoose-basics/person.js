const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/personApp");
  console.log("Connection open!");
}

const personSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

//middleware pre save
personSchema.pre("save", async function () {
  this.firstName = "pre";
  this.lastName = "middleware";

  console.log("ABOUT TO SAVE");
});

//middleware post save
personSchema.post("save", async function () {
  console.log("JUST SAVED");
});

//Virtuals: Properties that are not stored at the database.
personSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

const Person = mongoose.model("Person", personSchema);

create();

async function create() {
  try {
    const person = await new Person({
      firstName: "Enzo",
      lastName: "Hernández",
    });

    await person.save();

    console.log(person);
    console.log(person.fullName);
  } catch (error) {
    console.log(error.errors);
  }
}
