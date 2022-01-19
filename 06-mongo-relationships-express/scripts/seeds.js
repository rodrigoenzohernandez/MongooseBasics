const mongoose = require("mongoose");

const Product = require("./../models/product");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/farmStand");
  console.log("Connection open!");
}

function insertOneProduct(){
    const p = new Product({
        name: "Manzana",
        price: 200,
        category: "fruit",
      });
      
      p.save()
        .then((p) => console.log(p))
        .catch((e) => console.log(e));
}

const seedProducts = [
    {
        name: "Pera",
        price: 300,
        category: "fruit",
      },
      {
        name: "Sandía",
        price: 1000,
        category: "fruit",
      },
      {
        name: "Lechuga",
        price: 50,
        category: "vegetable",
      },
      {
        name: "Papa",
        price: 100,
        category: "vegetable",
      }
]

insertMany()

function insertMany() {
  Product.insertMany(seedProducts)
    .then((data) => console.log(data))
    .catch((e) => console.log(e))
}
