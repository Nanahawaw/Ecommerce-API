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
    const { name, description, price, category, quantity, brand } = req.fields;

    // Validation
    switch (true) {
      case !name:
        return res.json({ error: 'Name is required' });
      case !brand:
        return res.json({ error: 'Brand is required' });
      case !description:
        return res.json({ error: 'Description is required' });
      case !price:
        return res.json({ error: 'Price is required' });
      case !category:
        return res.json({ error: 'Category is required' });
      case !quantity:
        return res.json({ error: 'Quantity is required' });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );

    await product.save();

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
};

const removeProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json('Product not found');
    } else {
      res.json('product removed successfully');
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};
const fetchProducts = async (req, res) => {
  try {
    const pageSize = 6;
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: 'i' } }
      : {};

    const count = await Product.countDocuments({ keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);
    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasmore: false,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

const getOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.json(product);
    } else {
      res.status(404).json('product not found');
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate('category')
      .limit(12)
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

const addProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user.id.toString()
      );
      if (alreadyReviewed) {
        return res.status(400).json('You already reviewed this product'); // Return here to exit the function
      }
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user.id,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      return res.status(201).json({ message: 'Review added successfully' }); // Return here to exit the function
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message); // Return here to exit the function
  }
};

const fetchTopProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(5);
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

const fetchNewProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ _id: -1 }).limit(4);
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

module.exports = {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  getOneProduct,
  getAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
};
