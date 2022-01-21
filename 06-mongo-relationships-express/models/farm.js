const mongoose = require('mongoose')
const {schema} = mongoose;
const Product = require('../models/product')
const farmSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Farm must have a name'],
    },
    city:{
        type: String,
    },
    email:{
        type: String,
        required: [true, 'Email required'],
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})

//query middleware (this === query)

farmSchema.post('findOneAndDelete', async function(farm){
    if(farm.products.length){
        const res = await Product.deleteMany({_id: {$in: farm.products}})
        console.log(res);
    }
    console.log('POST MIDDLEWARE');
    console.log(farm);
})
const Farm = mongoose.model('Farm', farmSchema);
 
module.exports = Farm;