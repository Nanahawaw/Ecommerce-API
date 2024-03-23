const express = require('express');
const router = express.Router();

const { verifyToken, authorizedAdmin } = require('../middlewares/verifyToken');
const createCategory = require('../controllers/categoryCtrl.js');

router.post('/', verifyToken, authorizedAdmin, createCategory);

module.exports = router;
