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

router.post('/createOrder', verifyToken, createOrder);
router.get('/allOrders', verifyToken, authorizedAdmin, getAllOrders);
router.get('/orders/mine', verifyToken, getUserOrders);
router.get('/total-orders', countTotalOrders);
router.get('/total-sales', calculateTotalSales);
router.get('/total-sales-by-date', calculateTotalSalesByDate);
router.get('order/:id', verifyToken, findOrderById);
router.put('order/:id/pay', verifyToken, markOrderAsPaid);
router.put(
  'order/:id/deliver',
  verifyToken,
  authorizedAdmin,
  markOrderAsDelivered
);
module.exports = router;
