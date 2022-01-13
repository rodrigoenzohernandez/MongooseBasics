const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/movieApp");
  console.log("Connection open!");
}

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  score: Number,
  rating: String,
});

const Movie = mongoose.model("Movie", movieSchema);

function insertOneDocument() {
  const spiderman = new Movie({
    title: "Spiderman No Way Home",
    year: 2022,
    score: 10,
    rating: "APT",
  });
  spiderman.save();
}

function insertMany() {
  Movie.insertMany([
    { title: "Spiderman I", year: 2018, score: 10, rating: "APT" },
    { title: "Spiderman II", year: 2019, score: 10, rating: "APT" },
    { title: "Spiderman III", year: 2020, score: 10, rating: "APT" },
    { title: "Spiderman IV", year: 2021, score: 10, rating: "APT" },
    { title: "Spiderman V", year: 2022, score: 10, rating: "APT" },
  ]).then((data) => {
    console.log("IT WORKED");
    console.log(data);
  });
}

// findAllDocuments()

async function findAllDocuments() {
  const allDocuments = await Movie.find({});
  console.log(allDocuments);
}

// findWithCondition()

async function findWithCondition() {
  const data = await Movie.find({ year: { $gte: 2020 } });
  console.log(data);
}

// findAndUpdate()

async function findAndUpdate() {
  const query = { title: "spidermanNNNNNN" };
  const newDocument = { title: "aaaaaaaaaaaaaaaaaa" };
  const updated = await Movie.findOneAndUpdate(query, newDocument, {
    new: true,
  });
  console.log(updated);
}

// deleteOne();

async function deleteOne() {
  const deleted = await Movie.findOneAndDelete({ title: "aaaaaaaaaaaaaaaaaa" });
  console.log(deleted);
}
