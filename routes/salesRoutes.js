const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

// criar endpoint GET /sales
router.get('/', salesController.getAllSales);

// criar endpoint GET /sales/:id
router.get('/:id', salesController.getSaleById);

// criar endpoint POST /sales
router.post('/', salesController.addSale);

// criar endpoint PUT /sales/:id

// criar endpoint DELETE /sales/:id

module.exports = router;
