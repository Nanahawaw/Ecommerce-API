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

router.post('/createCategory', verifyToken, authorizedAdmin, createCategory);
router.put(
  '/updateCategory/:categoryId',
  verifyToken,
  authorizedAdmin,
  updateCategory
);
router.delete(
  'deleteCategory/:categoryId',
  verifyToken,
  authorizedAdmin,
  deleteCategory
);
router.get('/categories', listAllCategories);
router.get('category/:id', getOneCategory);

module.exports = router;
