// //mongo connection

const mongoose = require("mongoose");
const { Schema } = mongoose;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/relationships");
  console.log("Connection open!");
}

const farmSchema = new Schema({
  name: String,
  city: String,
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

const productSchema = new Schema({
  name: String,
  price: Number,
  season: {
    type: String,
    enum: ["Spring", "Summer", "Fall", "Winter"],
  },
});

const Product = mongoose.model("Product", productSchema);
const Farm = mongoose.model("Farm", farmSchema);

const makeFarm = async () => {
  const farm = new Farm({
    name: "Don Mario",
    city: "Burzaco",
  });
  const Sandia = await Product.findOne({ name: "Sandia" });

  farm.products.push(Sandia);

  await farm.save();

  console.log(farm);
};

//makeFarm();

Farm.findOne({ name: 'Don Mario' })
    .populate('products')
    .then (farm => console. log(farm))