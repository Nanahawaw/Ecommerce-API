const Category = require('../models/categoryModel.js');

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.json({ error: 'Category name is required' });
    }

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.json({ error: 'Category already exists' });
    }
    const category = await new Category({ name }).save();
    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

module.exports = createCategory;
