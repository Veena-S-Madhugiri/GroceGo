const express = require('express');
const router = express.Router();
const Products = require('../models/Products');

// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Products.find({});
    res.status(200).json(products);
   
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




module.exports = router;