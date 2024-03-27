const express = require('express');
const { verifyToken, authorizedAdmin } = require('../middlewares/verifyToken');
const { createOrder } = require('../controllers/orderCtrl');
const router = express.Router();

router.post('/', verifyToken, authorizedAdmin, createOrder);

module.exports = router;
