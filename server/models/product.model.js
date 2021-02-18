const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({
  name: { 
    type: String, 
    required: [true, 'El nombre es necesario'] 
  },
  price: {
    type: Number, 
    required: [true, 'El precio únitario es necesario'] 
  },
  description: {
    type: String, 
    required: false 
  },
  img: {
    type: String, 
    required: false 
  },
  enable: {
    type: Boolean, 
    required: true, 
    default: true 
  },
  category: {
    type: Schema.ObjectId, 
    ref: 'Category', 
    required: true 
  },
  user: {
    type: Schema.ObjectId, 
    ref: 'User' 
  }
});


module.exports = mongoose.model('Product', productSchema);