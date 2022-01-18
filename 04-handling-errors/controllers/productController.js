const Product = require("./../models/product");

const AppError = require("../utilities/AppError");
const Joi = require("joi");

const productController = {
  async getProducts(req, res) {
    const regexName = new RegExp(req.query.name, "i");
    const regexCat = new RegExp(req.query.category, "i");
    const filter = {
      name: { $regex: regexName },
      category: { $regex: regexCat },
    };

    const products = await Product.find(filter);

    res.send(products);
  },
  async getProductDetail(req, res, next) {
    const product = await Product.findById(req.params.id);
    if (product) res.send(product);
    else {
      throw new AppError("Product Not Found", 404);
    }
  },
  async createProduct(req, res, next) {
    const productSchema = Joi.object({
      name: Joi.string().required(),
      price: Joi.number().required().min(0),
      category: Joi.string(),
    }).required();

    const { error } = productSchema.validate(req.body);

    if (error) {
      const msg = error.details[0].message;
      throw new AppError(msg, 400);
    }

    const p = new Product(req.body);

    p.save()
      .then((p) => {
        res.status(201);
        res.send(p);
      })
      .catch((e) => {
        return next(e);
      });
  },
  async updateProduct(req, res, next) {
    const id = req.body._id;
    const newDocument = req.body;

    const options = {
      new: true,
      runValidators: true,
    };
    const updated = await Product.findByIdAndUpdate(id, newDocument, options);

    if (updated) res.send(updated);
    else {
      throw new AppError(
        "No product was found with that ID, so nothing was updated",
        404
      );
    }
  },
  async deleteProduct(req, res, next) {
    const deleted = await Product.findByIdAndRemove(req.body._id);

    if (deleted) res.send(deleted);
    else {
      throw new AppError(
        "No product was found with that ID, so nothing was deleted",
        404
      );
    }
  },
};

module.exports = productController;
