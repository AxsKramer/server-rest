const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  description: {
    type: String,
    unique: true,
    required: [true, 'La descripción es obligatoria']
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Category', categorySchema);