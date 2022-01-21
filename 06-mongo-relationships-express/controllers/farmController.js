const Farm = require('../models/farm')
const Product = require('../models/product')

const farmController = {
  async getFarms(req, res) {
      const farms = await Farm.find({});
      res.send(farms)
  },
  async getFarmDetail(req, res) {
    const farm = await Farm.findById(req.params.id);
    res.send(farm)
},
  async createFarm(req, res){
      const farm = new Farm(req.body);
      await farm.save()
      res.send(farm)
  },
  async addProductToFarm(req, res){
      const {id} = req.params;
      const productId = req.query.productId
      const farm = await Farm.findById(id);
      const product = await Product.findById(productId);

      farm.products.push(product);
      product.farm = farm;
      await farm.save();
      await product.save();
      res.send(farm)
  },
  async deleteFarm(req, res){
    const farm = await Farm.findByIdAndDelete(req.params.id);

    res.send(farm)

  }
  
};

module.exports = farmController;
