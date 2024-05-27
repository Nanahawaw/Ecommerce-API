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
  filteredProducts,
} = require('../controllers/productCtrl');

const router = express.Router();

router.post(
  '/addProduct/',
  verifyToken,
  authorizedAdmin,
  formidable(),
  addProduct
);
router.get('/getProduct/', verifyToken, fetchProducts);

router.get('/allproducts', authorizedAdmin, getAllProducts);
router.post('/product/:id/reviews', verifyToken, checkId, addProductReview);

router.get('/topProducts', fetchTopProducts);
router.get('/newProducts', fetchNewProducts);

router.put(
  '/updateProduct/:id',
  verifyToken,
  authorizedAdmin,
  formidable(),
  updateProductDetails
);
router.delete(
  '/removeProduct/:id',
  verifyToken,
  authorizedAdmin,
  removeProduct
);
router.get('/product/:id', verifyToken, getOneProduct);

router.post('/products/filtered-products', verifyToken, filteredProducts);

module.exports = router;
