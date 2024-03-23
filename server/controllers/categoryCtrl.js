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

const updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findOne({ _id: categoryId });
    if (!category) {
      return res.status(400).json('category not found');
    } else {
      const { name } = req.body;
      category.name = name;
      const updatedCategory = await category.save();
      res.json(updatedCategory);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const removed = await Category.findByIdAndDelete(req.params.categoryId);
    res.json({ message: 'category deleted successfully', removed });
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

const listAllCategories = async (req, res) => {
  try {
    const getallCategories = await Category.find({});
    res.json(getallCategories);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

const getOneCategory = async (req, res) => {
  try {
    const category = await Category.findById({ _id: req.params.id });
    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};
module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  listAllCategories,
  getOneCategory,
};
