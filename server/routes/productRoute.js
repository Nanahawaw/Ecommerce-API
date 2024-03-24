const express = require('express');
const formidable = require('express-formidable');
const { verifyToken, authorizedAdmin } = require('../middlewares/verifyToken');
const checkId = require('../middlewares/checkId');
const { addProduct } = require('../controllers/productCtrl');

const router = express.Router();

router.post('/', verifyToken, authorizedAdmin, formidable(), addProduct);

module.exports = router;
