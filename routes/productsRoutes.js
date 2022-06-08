const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

// criar endpoint GET /products
router.get('/', productsController.getAllProducts);

// criar endpoint GET /products/:id
router.get('/:id', productsController.getProductById);

// criar endpoint POST /products
router.post('/', productsController.addProduct);

// criar endpoint PUT /products/:id

// criar endpoint DELETE /products/:id

module.exports = router;
