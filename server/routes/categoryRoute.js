const express = require('express');
const router = express.Router();

const { verifyToken, authorizedAdmin } = require('../middlewares/verifyToken');
const {
  createCategory,
  updateCategory,
  deleteCategory,
  listAllCategories,
  getOneCategory,
} = require('../controllers/categoryCtrl.js');

router.post('/', verifyToken, authorizedAdmin, createCategory);
router.put('/:categoryId', verifyToken, authorizedAdmin, updateCategory);
router.delete('/:categoryId', verifyToken, authorizedAdmin, deleteCategory);
router.get('/categories', listAllCategories);
router.get('/:id', getOneCategory);

module.exports = router;
