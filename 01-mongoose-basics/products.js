const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/shopApp");
  console.log("Connection open!");
}

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 20,
  },
  price: {
    type: Number, //It expects something that can be converted into a number. If not, fails
    min: [0, "EL PRECIO DEBE SER POSITIVO"],
  },
  onSale: {
    type: Boolean,
    default: false,
  },
  categories: [String],
  qty: {
    online: {
      type: Number,
      default: 0,
    },
    inStore: {
      type: Number,
      default: 0,
    },
  },
  size: {
    type: String,
    enum: ["S", "M", "L"],
  },
});

//Instance Method
productSchema.methods.toggleOnSale = function () {
  //this --> refers to the instance
  this.onSale = !this.onSale;
  return this.save();
};

//Static Method
//this --> refers to the model
productSchema.statics.fireSale = function () {
  return this.updateMany({}, { onSale: true, price: 0 });
};

const Product = mongoose.model("Product", productSchema);

//createProduct()

async function createProduct() {
  try {
    const bike = await new Product({
      name: "Super Bike 100",
      price: 100,
      categories: ["Gold", "Metal"],
      size: "S",
    });

    await bike.save();

    console.log(bike);
  } catch (error) {
    console.log(error.errors);
  }
}

//findAndUpdate()

async function findAndUpdate() {
  const query = { name: "Super Bike 4" };
  const newDocument = { price: -50 };
  const updated = await Product.findOneAndUpdate(query, newDocument, {
    new: true,
    runValidators: true,
  });
  console.log(updated);
}

const findProduct = async () => {
  const productFound = await Product.findOne({ name: "Super Bike 100" });
  await productFound.toggleOnSale();

  console.log(productFound);
};

//findProduct()

fireSale();

async function fireSale() {
  const resultStaticMethod = await Product.fireSale();
  console.log(resultStaticMethod);
}
