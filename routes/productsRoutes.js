const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

// criar endpoint GET /products
router.get('/', productsController.getAllProducts);

// criar endpoint GET /products/:id

// criar endpoint POST /products

// criar endpoint PUT /products/:id

// criar endpoint DELETE /products/:id

module.exports = router;