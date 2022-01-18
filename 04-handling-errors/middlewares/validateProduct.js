const AppError = require("../utilities/AppError");

const productSchema = require("../bodySchemas/product");

module.exports = (req, res, next) => {
  const { error } = productSchema.validate(req.body);

  if (error) {
    const msg = error.details[0].message;
    throw new AppError(msg, 400);
  } else {
    next();
  }
};
