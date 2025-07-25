const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  category: String,
  subcategory: String,
  barcode: { type: String, required: true, unique: true },
  caseBarcode: String,
  productName: String,
  quantityOptions: [String], // ['750ml', '1L', '1.75L']
  count: Number,
  costPrice: Number,
  margin: Number,
  salePrice: Number,
  vendor: String,
  vendorContact: String,
  email: String,
  bottleLocation: String,
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
