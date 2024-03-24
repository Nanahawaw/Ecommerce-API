const express = require('express');
const formidable = require('express-formidable');
const { verifyToken, authorizedAdmin } = require('../middlewares/verifyToken');
const checkId = require('../middlewares/checkId');
const { addProduct, updateProductDetails } = require('../controllers/productCtrl');

const router = express.Router();

router.post('/', verifyToken, authorizedAdmin, formidable(), addProduct);
router.put("/:id", verifyToken, authorizedAdmin, formidable(), updateProductDetails )

module.exports = router;
