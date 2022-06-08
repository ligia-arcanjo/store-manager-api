const productsService = require('../services/productsService');

const getAllProducts = async (_req, res) => {
  const productsList = await productsService.getAllProducts();
  res.status(200).json(productsList);
};

module.exports = { getAllProducts };
