const express = require('express');
const productsController = require('../controllers/productsController');
const { validateName, validateQuantity } = require('../middlewares/productsValidations');

const router = express.Router();

router.get('/', productsController.getAllProducts);

router.get('/:id', productsController.getProductById);

router.post('/', validateName, validateQuantity, productsController.addProduct);

router.put('/:id', productsController.updateProduct);

router.delete('/:id', productsController.deleteProduct);

module.exports = router;
