const productsService = require('../services/productsService');

const getAllProducts = async (_req, res) => {
  const productsList = await productsService.getAllProducts();
  res.status(200).json(productsList);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const [product] = await productsService.getProductById(id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.status(200).json(product);
};

module.exports = { getAllProducts, getProductById };
