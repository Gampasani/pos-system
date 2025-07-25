const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Add a new product
router.post('/add', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: 'Product added', product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update inventory (reduce count) on pay
router.put('/', async (req, res) => {
  const { name, qty } = req.body;
  try {
    const product = await Product.findOne({ productName: name });
    if (!product) return res.status(404).json({ error: "Product not found" });

    product.count = Math.max(0, product.count - qty);
    await product.save();
    res.json({ message: "Inventory updated", updatedProduct: product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
