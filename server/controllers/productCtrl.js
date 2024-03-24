const Product = require('../models/productModel');

const addProduct = async (req, res) => {
  const findProduct = await Product.findOne({ name: req.fields.name });

  if (findProduct) {
    return res.json('product already exists');
  }
  try {
    const { name, description, price, category, quantity, brand } = req.fields;
    //validation

    switch (true) {
      case !name:
        return res.json({ error: 'Name is required' });
      case !description:
        return res.json({ error: 'description is required' });
      case !price:
        return res.json({ error: 'price is required' });
      case !category:
        return res.json({ error: 'category is required' });
      case !quantity:
        return res.json({ error: 'quantity is required' });
      case !brand:
        return res.json({ error: 'brand is required' });
    }
    const product = new Product({ ...req.fields });
    await product.save();
    res.json({ product, message: 'Product added successfully' });
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

const updateProductDetails = async (req, res) => {
  try {
    const fieldsToUpdate = Object.keys(req.fields);
    const errors = [];

    // Validate only the fields that are being updated
    if (fieldsToUpdate.includes('name') && !req.fields.name) {
      errors.push('Name is required');
    }
    if (fieldsToUpdate.includes('description') && !req.fields.description) {
      errors.push('Description is required');
    }
    if (fieldsToUpdate.includes('price') && !req.fields.price) {
      errors.push('Price is required');
    }
    if (fieldsToUpdate.includes('category') && !req.fields.category) {
      errors.push('Category is required');
    }
    if (fieldsToUpdate.includes('quantity') && !req.fields.quantity) {
      errors.push('Quantity is required');
    }
    if (fieldsToUpdate.includes('brand') && !req.fields.brand) {
      errors.push('Brand is required');
    }

    // If there are errors, return them
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    // Update the product
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: { ...req.fields, someOtherField: 'default value' } },
      { new: true }
    );

    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

module.exports = { addProduct, updateProductDetails };
