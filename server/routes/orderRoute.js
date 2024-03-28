const express = require('express');
const { verifyToken, authorizedAdmin } = require('../middlewares/verifyToken');
const {
  createOrder,
  getAllOrders,
  getUserOrders,
  countTotalOrders,
  calculateTotalSales,
  calculateTotalSalesByDate,
  findOrderById,
  markOrderAsPaid,
  markOrderAsDelivered,
} = require('../controllers/orderCtrl');
const router = express.Router();

router.post('/', verifyToken, createOrder);
router.get('/', verifyToken, authorizedAdmin, getAllOrders);
router.get('/mine', verifyToken, getUserOrders);
router.get('/total-orders', countTotalOrders);
router.get('/total-sales', calculateTotalSales);
router.get('/total-sales-by-date', calculateTotalSalesByDate);
router.get('/:id', verifyToken, findOrderById);
router.put('/:id/pay', verifyToken, markOrderAsPaid);
router.put('/:id/deliver', verifyToken, authorizedAdmin, markOrderAsDelivered);
module.exports = router;
