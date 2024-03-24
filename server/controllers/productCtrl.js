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

const removeProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) { return res.status(404).json("Product not found") } else { res.json("product removed successfully") }
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
}
const fetchProducts = async (req, res) => {
  try {
    const pageSize = 6;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
        name: { $regex: req.query.keyword, $options: "i" },
      }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      hasmore: page < Math.ceil(count / pageSize),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


const getOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (product) {
      return res.json(product)
    } else {
      res.status(404).json("product not found")
    }

  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
}

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate("category").limit(12).sort({ createAt: -1 })

    res, json(products)

  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
}

module.exports = {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  getOneProduct,
  getAllProducts
};
