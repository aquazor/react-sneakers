import mongoose from 'mongoose';

const sizeSchema = new mongoose.Schema({
  count: {
    type: Number,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  sizes: [sizeSchema],
  price: {
    type: Number,
    required: true,
  },
});

const Item = mongoose.model('Item', itemSchema);

export default Item;
