const express = require('express');
const formidable = require('express-formidable');
const { verifyToken, authorizedAdmin } = require('../middlewares/verifyToken');
const checkId = require('../middlewares/checkId');
const {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  getOneProduct,
  getAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
} = require('../controllers/productCtrl');

const router = express.Router();

router.post('/', verifyToken, authorizedAdmin, formidable(), addProduct);
router.get('/', verifyToken, fetchProducts);

router.get('/allproducts', authorizedAdmin, getAllProducts);
router.post('/:id/reviews', verifyToken, checkId, addProductReview);

router.get('/top', fetchTopProducts);
router.get('/new', fetchNewProducts);

router.put(
  '/:id',
  verifyToken,
  authorizedAdmin,
  formidable(),
  updateProductDetails
);
router.delete('/:id', verifyToken, authorizedAdmin, removeProduct);
router.get('/:id', verifyToken, getOneProduct);

module.exports = router;
