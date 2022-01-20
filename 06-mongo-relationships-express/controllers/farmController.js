const Farm = require('../models/farm')

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
  }
};

module.exports = farmController;
