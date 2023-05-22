const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({

  payment: {},
  buyer:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status:{
    type: String,
    default: 'Not Process',
    enum: ['Not Process', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
  },
//   product: [{
//     productId: String,
//     qty: Number,
//   }],
products: [{
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  numberOfQuantity: Number
}],

  shippingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
  },
}, 
{timestamps:true});

module.exports = mongoose.model("Orders", ordersSchema);