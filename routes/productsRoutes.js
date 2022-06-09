const express = require('express');
const productsController = require('../controllers/productsController');
const { validateName, validateQuantity } = require('../middlewares/productsValidations');

const router = express.Router();

// criar endpoint GET /products
router.get('/', productsController.getAllProducts);

// criar endpoint GET /products/:id
router.get('/:id', productsController.getProductById);

// criar endpoint POST /products
router.post('/', validateName, validateQuantity, productsController.addProduct);

// criar endpoint PUT /products/:id
router.put('/:id', productsController.updateProduct);

// criar endpoint DELETE /products/:id
router.delete('/:id', productsController.deleteProduct);

module.exports = router;
