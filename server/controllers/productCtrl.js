const Product = require('../models/productModel');

const addProduct = async (req, res) => {
  const { name, brand } = req.body;
};

module.exports = { addProduct };
